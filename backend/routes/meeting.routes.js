import express from "express" ;
import { Router } from "express";
import { createMeeting } from "../controllers/meeting.controller.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router() ;

router.post("/create", validate(createMeeting) ,createMeeting) ;

export default router ;