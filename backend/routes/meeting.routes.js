import express from "express" ;
import { Router } from "express";
import { createMeeting } from "../controllers/meeting.controller.js";

const router = express.Router() ;

router.post("/", createMeeting) ;

export default router ;