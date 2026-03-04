import express from "express" ;
import { validate } from "../middleware/validate.middleware.js";
import { createMeetingSchema } from "../schemas/meeting.schema.js";
import { createMeeting, getAllMeeting, getMeetingById } from "../controllers/meeting.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router() ;

router.post("/create", upload.single("audio") ,createMeeting) ;
router.get("/all", getAllMeeting) ;
router.get("/:id", getMeetingById) ;

export default router ;