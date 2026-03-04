import prisma from "../prisma/client.js";

export const createMeetingService = async (meetingData)=>{
    return prisma.meeting.create({
        data: meetingData
    }) ;
} ;

export const getAllMeetingService = async()=>{
    return prisma.meeting.findMany({
        orderBy:{createdAt:"desc"}
    }) ;
} ;

export const getMeetingByIdService = async(id)=>{
    return prisma.meeting.findUnique({
        where:{id:Number(id)}
    }) ;
} ;