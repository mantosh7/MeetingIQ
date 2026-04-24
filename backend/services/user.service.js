import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

export const getMeService = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId }, 
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    }
  });
};

export const passwordChangeService = async (userId, {currentPassword, newPassword}) => {
    const user = await prisma.user.findUnique({
      where: {id: userId},
      select:{password: true}
    }) ;

    const isMatch = await bcrypt.compare(currentPassword, user.password) ;
    if(!isMatch) throw new Error("Password does not match") ;

    const newHashedPassword = await bcrypt.hash(newPassword, 10) ;
    await prisma.user.update({
      where: {id: userId},
      data:{
        password: newHashedPassword
      }
    })
}