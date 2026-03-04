from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
import re
import json
import uuid
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

if os.name == "nt":
    os.environ["PATH"] += os.pathsep + r"C:\ffmpeg\bin"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

whisper_model = whisper.load_model("base")
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def fix_nulls(obj):
    if isinstance(obj, list):
        return [fix_nulls(i) for i in obj]
    if isinstance(obj, dict):
        return {k: (None if v == "null" else fix_nulls(v)) for k, v in obj.items()}
    return obj


def analyze_with_llm(transcript):
    prompt = f"""
    Analyze this meeting transcript.

    Return ONLY valid JSON with this structure (no comments, no extra text):
    {{
        "summary": "2-3 sentence summary",
        "participants": ["name1", "name2"],
        "action_items": [
            {{
                "task": "task description",
                "assignee": "person name or null",
                "due_date": "YYYY-MM-DD or null",
                "priority": "High or Medium or Low"
            }}
        ]
    }}

    Transcript:
    {transcript}
    """

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    raw = completion.choices[0].message.content

    try:
        cleaned = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        cleaned = re.sub(r'//.*', '', cleaned)  # // comments hata do
        return fix_nulls(json.loads(cleaned))
    except json.JSONDecodeError:
        return {"summary": raw, "participants": [], "action_items": []}


@app.post("/analyze-meeting")
async def analyze_meeting(file: UploadFile = File(...)):
    audio_path = os.path.join(BASE_DIR, f"temp_{uuid.uuid4()}.mp3")
    try:
        with open(audio_path, "wb") as buffer:
            buffer.write(await file.read())
        transcript = whisper_model.transcribe(audio_path)["text"]
        analysis = analyze_with_llm(transcript)
        return {"success": True, "transcript": transcript, "analysis": analysis}
    except Exception as e:
        return {"success": False, "error": str(e)}
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)