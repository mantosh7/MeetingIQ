import prisma from "../prisma/client.js";

export const createMeetingService = async (meetingData)=>{
    return prisma.meeting.create({
        data: meetingData
    }) ;
} ;

export const getAllMeetingService = async (userId) => {
    return prisma.meeting.findMany({
        where: { userId }, 
        orderBy: { createdAt: "desc" }
    });
};

export const getMeetingByIdService = async (id, userId) => {
    return prisma.meeting.findFirst({
        where: {
            id: Number(id),
            userId   //  ownership check
        }
    });
};