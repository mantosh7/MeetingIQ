import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient() ;

export const createMeeting = async (req, res)=>{
    try {
        const {title, transcript} = req.body ;
        if(!title || !transcript) {
            return res.status(400).json({message: "Title and transcipt required"}) ; 
        }

        const summary = transcript.substring(0, 100) ;

        const meeting = await prisma.meeting.create({
            data: {title, transcript, summary},
        })
        res.status(201).json(meeting) ;
    } catch (error) {
        console.log(error) ;
        res.status(500).json({message: "server error"})
    }
}