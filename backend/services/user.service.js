import prisma from "../prisma/client.js";

export const getMeService = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId }, 
    select: {
      id: true,
      name: true,
      email: true,
    }
  });
};