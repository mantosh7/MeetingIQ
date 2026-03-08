import { generateSummary, analyzeMeetingAudio } from "../services/ai.service.js";
import { createMeetingService, getAllMeetingService, getMeetingByIdService } from "../services/meeting.service.js";
import fs from "fs";

export const createMeeting = async (req, res, next) => {
  try {
    const { title, transcript } = req.body;
    const audioFile = req.file;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    let finalTranscript = transcript;
    let summary = "";
    let tasks = null;

    if (audioFile) {
      const result = await analyzeMeetingAudio(audioFile.path);

      if (!result || !result.transcript) {
        return res.status(500).json({
          message: "Audio analysis failed",
          error: result?.error || "Unknown error"
        });
      }

      finalTranscript = result.transcript;
      const aiResult = await generateSummary(finalTranscript);
      summary = aiResult.summary || "";
      tasks = aiResult.action_items || null;

    } else if (finalTranscript) {
      const aiResult = await generateSummary(finalTranscript);
      summary = aiResult.summary || aiResult;
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

    res.status(201).json({ success: true, data: meeting });

  } catch (error) {
    next(error);
  } finally {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
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