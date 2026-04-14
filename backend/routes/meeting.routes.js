import express from "express" ;
import { validate } from "../middleware/validate.middleware.js";
import { createMeetingSchema } from "../schemas/meeting.schema.js";
import { createMeeting, getAllMeeting, getMeetingById } from "../controllers/meeting.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router() ;

router.post("/create", authMiddleware, upload.single("audio"), createMeeting);
router.get("/all", authMiddleware, getAllMeeting);
router.get("/:id", authMiddleware, getMeetingById);

export default router ;