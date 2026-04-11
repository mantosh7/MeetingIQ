# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import whisper
# import os
# import uuid
# from dotenv import load_dotenv
# from groq import Groq

# load_dotenv()

# if os.name == "nt":
#     os.environ["PATH"] += os.pathsep + r"C:\Users\mahir\ffmpeg\bin"

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# whisper_model = whisper.load_model("base")
# client = Groq(api_key=os.getenv("GROQ_API_KEY"))
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# @app.post("/analyze-meeting")
# async def analyze_meeting(file: UploadFile = File(...)):
#     audio_path = os.path.join(BASE_DIR, f"temp_{uuid.uuid4()}.mp3")
#     try:
#         with open(audio_path, "wb") as buffer:
#             buffer.write(await file.read())
#         transcript = whisper_model.transcribe(audio_path)["text"]
#         return {"success": True, "transcript": transcript}
#     except Exception as e:
#         return {"success": False, "error": str(e)}
#     finally:
#         if os.path.exists(audio_path):
#             os.remove(audio_path)


# FastAPI import - API banane ke liye
from fastapi import FastAPI, UploadFile, File

# CORS middleware - frontend (React etc.) se request allow karne ke liye
from fastapi.middleware.cors import CORSMiddleware

# Whisper - speech to text model
import whisper

# OS & UUID - file handling aur unique filename ke liye
import os
import uuid

# Env variables load karne ke liye (.env file)
from dotenv import load_dotenv

# Groq client (future use for summarization etc.)
from groq import Groq


# Load environment variables
load_dotenv()

# Windows me ffmpeg ka path manually add karna padta hai (Whisper ke liye required)
if os.name == "nt":
    os.environ["PATH"] += os.pathsep + r"C:\Users\mahir\ffmpeg\bin"

# FastAPI app initialize
app = FastAPI()

# CORS enable - taaki frontend se API hit kar sake
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # sab allow (production me restrict karna chahiye)
    allow_methods=["*"],
    allow_headers=["*"],
)

# Whisper model load (base model - fast + decent accuracy)
whisper_model = whisper.load_model("base")

# Groq client initialize (abhi use nahi ho raha, future ke liye)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Current file ka directory path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# API endpoint - audio file receive karega
@app.post("/analyze-meeting")
async def analyze_meeting(file: UploadFile = File(...)):
    
    # Unique temporary file name generate kar rahe hain
    audio_path = os.path.join(BASE_DIR, f"temp_{uuid.uuid4()}.mp3")

    try:
        # Uploaded file ko temporary save kar rahe hain
        with open(audio_path, "wb") as buffer:
            buffer.write(await file.read())

        # Whisper se audio ko text me convert karna
        transcript = whisper_model.transcribe(audio_path)["text"]

        # Success response return
        return {
            "success": True,
            "transcript": transcript
        }

    except Exception as e:
        # Agar error aaye to error message return
        return {
            "success": False,
            "error": str(e)
        }

    finally:
        # Temporary file ko delete karna (cleanup)
        if os.path.exists(audio_path):
            os.remove(audio_path)