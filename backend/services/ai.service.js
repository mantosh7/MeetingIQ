import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

// Text transcript se summary + action items (existing flow)
export const generateSummary = async (transcript) => {
  const prompt = `
  Analyze this meeting transcript carefully.

  Return ONLY valid JSON (no extra text, no markdown) with this exact structure:
  {
    "summary": "2-3 sentence summary of the meeting",
    "participants": ["name1", "name2"],
    "action_items": [
      {
        "task": "task description",
        "assignee": "person name or null",
        "due_date": "YYYY-MM-DD or null",
        "priority": "High or Medium or Low"
      }
    ]
  }

  Transcript:
  ${transcript}
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.choices[0].message.content;

  try {
    const cleaned = raw
      .trim()
      .replace(/^```json/, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();
    return JSON.parse(cleaned);
  } catch {
    // fallback agar JSON parse fail ho
    return { summary: raw, participants: [], action_items: [] };
  }
};

// Audio file FastAPI ke Whisper endpoint pe bhejo
export const analyzeMeetingAudio = async (audioFilePath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(audioFilePath));

  const response = await axios.post(
    `${FASTAPI_URL}/analyze-meeting`,
    formData,
    {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 120000, // 2 min timeout (whisper slow ho sakta hai)
    }
  );

  return response.data;
};