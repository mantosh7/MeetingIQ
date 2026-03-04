import { generateSummary, analyzeMeetingAudio } from "../services/ai.service.js";
import { createMeetingService, getAllMeetingService, getMeetingByIdService } from "../services/meeting.service.js";
import fs from "fs";

export const createMeeting = async (req, res, next) => {
  try {
    const { title, transcript } = req.body;
    const audioFile = req.file; // multer se aayega agar audio upload kiya

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    let finalTranscript = transcript;
    let summary = "";
    let tasks = null;

    if (audioFile) {
      // --- AUDIO FLOW ---
      // FastAPI ke /analyze-meeting endpoint pe bhejo
      const result = await analyzeMeetingAudio(audioFile.path);

      // Temp audio file delete karo
      if (fs.existsSync(audioFile.path)) {
        fs.unlinkSync(audioFile.path);
      }

      if (!result.success) {
        return res.status(500).json({ message: "Audio analysis failed", error: result.error });
      }

      finalTranscript = result.transcript;
      summary = result.analysis.summary || "";
      tasks = result.analysis.action_items || null;

    } else if (finalTranscript) {
      // --- TEXT TRANSCRIPT FLOW ---
      const aiResult = await generateSummary(finalTranscript);
      summary = aiResult.summary || aiResult; // backward compatible
      tasks = aiResult.action_items || null;

    } else {
      return res.status(400).json({ message: "Either transcript or audio file is required" });
    }

    const meeting = await createMeetingService({
      title,
      transcript: finalTranscript,
      summary,
      tasks: tasks || null,
    });

    res.status(201).json({
      success: true,
      data: meeting,
    });

  } catch (error) {
    // Agar error ke time audio file abhi bhi exist kare toh delete karo
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const getAllMeeting = async (req, res, next) => {
  try {
    const allMeetingData = await getAllMeetingService();
    res.status(200).json({ success: true, message: allMeetingData });
  } catch (error) {
    next(error);
  }
};

export const getMeetingById = async (req, res, next) => {
  try {
    const meetingData = await getMeetingByIdService(req.params.id);
    if (!meetingData) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.status(200).json({ success: true, message: meetingData });
  } catch (error) {
    next(error);
  }
};