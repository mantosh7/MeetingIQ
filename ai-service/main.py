from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class TranscriptRequest(BaseModel):
    transcript: str


@app.post("/summarize")
def summarize(data: TranscriptRequest):

    transcript = data.transcript

    # Dummy summary (temporary)
    summary = transcript[:150]

    return {
        "summary": summary
    } 