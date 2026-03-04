import { generateSummary } from "../services/ai.service.js";
import { createMeetingService, getAllMeetingService, getMeetingByIdService } from "../services/meeting.service.js";


export const createMeeting = async (req, res, next)=>{
    try {
        const {title, transcript} = req.body ;
        const summary = await generateSummary(transcript) ;

        const meeting = await createMeetingService({title, transcript, summary}) ;
        res.status(200).json({success:true, data:meeting}) ;
    } catch (error) {
        next(error) ;  // sends error to central middleware
    }
}

export const getAllMeeting = async(req, res, next)=>{
    try {
        const allMeetingData = await getAllMeetingService() ;
        res.status(200).json({success:true, message:allMeetingData}) ;
    } catch (error) {
        next(error) ;
    }
}

export const getMeetingById = async(req, res, next)=>{
    try {
        const meetingData = await getMeetingByIdService(req.params.id) ;
        if(!meetingData) {
            return res.status(404).json({message: "Meeting not found"}) ;
        }
        res.status(201).json({success:true, message:meetingData}) ;
    } catch (error) {
        next(error) ;
    }
}