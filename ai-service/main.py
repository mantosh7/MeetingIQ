from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import os
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


@app.post("/analyze-meeting")
async def analyze_meeting(file: UploadFile = File(...)):
    audio_path = os.path.join(BASE_DIR, f"temp_{uuid.uuid4()}.mp3")
    try:
        with open(audio_path, "wb") as buffer:
            buffer.write(await file.read())
        transcript = whisper_model.transcribe(audio_path)["text"]
        return {"success": True, "transcript": transcript}
    except Exception as e:
        return {"success": False, "error": str(e)}
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)
