import { PrismaClient } from "@prisma/client";
import { generateSummary } from "../services/ai.service";
const prisma = new PrismaClient() ;

export const createMeeting = async (req, res, next)=>{
    try {
        const {title, transcript} = req.body ;
        if(!title || !transcript) {
            return res.status(400).json({message: "Title and transcipt required"}) ; 
        }

        const summary = await generateSummary(transcript) ;

        const meeting = await prisma.meeting.create({
            data: {title, transcript, summary},
        })
        res.status(201).json({success:true, data:meeting}) ;
    } catch (error) {
        next(error) ;  // sends error to central middleware
    }
}