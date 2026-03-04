import express from "express" ;
import { validate } from "../middleware/validate.middleware.js";
import { createMeetingSchema } from "../schemas/meeting.schema.js";
import { createMeeting, getAllMeeting, getMeetingById } from "../controllers/meeting.controller.js";

const router = express.Router() ;

router.post("/create", validate(createMeetingSchema) ,createMeeting) ;
router.get("/all", getAllMeeting) ;
router.get("/:id", getMeetingById) ;

export default router ;