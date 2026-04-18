import { prisma } from "../../lib/prisma"
import { AppError } from "../../utills/error"

export const createMessage=async (userId:number,payload:{
    content:string,
    unlockAt:string
})=>{
    //create message
    const convertDate=new Date(payload.unlockAt)
    if(convertDate<=new Date()){
        throw new AppError('unlockAt must be in the future',400)
    }
    const message=await prisma.message.create({
    data: {
      content: payload.content,
      unlockAt:payload.unlockAt,
      userId: userId,
    },
    })
    console.log(message)
    //return message
    return message
}



export const getSingleMessageService = async (
  messageId: number,
  userId: number
) => {

  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });

 
  if (!message) {
    throw new AppError("Message not found", 404);
  }


  if (message.userId !== userId) {
    throw new AppError("Unauthorized access", 403);
  }

  const now = new Date();

  if (now < message.unlockAt) {
    throw new AppError("Message is still locked 🔒", 403);
  }


  return message;
};