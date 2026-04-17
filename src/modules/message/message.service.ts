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