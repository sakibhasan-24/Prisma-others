import { prisma } from "../../lib/prisma"
import { AppError } from "../../utills/error"
import { getPagination } from "../../utills/pagination"

export const createMessage=async (userId:number,payload:{
    content:string,
    unlockAt:string
})=>{
    //create message
    // console.log(payload,"payload")
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
    // console.log(message,"message")
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


// get all messages

export const getAllMessagesService = async (userId: number, query: any) => {
  const { page, limit, skip,sortBy,sortOrder,search } = getPagination(query);
  const whereCondition:any={
    userId
  }
  if(search){
    whereCondition.content={
      contains:search,
      mode:"insensitive"
    }
  }
  const [messages, total] = await Promise.all([
    prisma.message.findMany({
      where: whereCondition,
      orderBy: { 
        [sortBy]: sortOrder 
      },
      skip,
      take: limit,
    }),
    prisma.message.count({
      where: whereCondition,
    }),
  ]);

  const now = new Date();

  const formatted = messages.map((msg) => {
    const isUnlocked = now >= msg.unlockAt;

    return {
      id: msg.id,
      content: isUnlocked ? msg.content : "🔒 Locked message",
      unlockAt: msg.unlockAt,
      isUnlocked,
    };
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: formatted,
  };
};



// UPDATE MESSAGE
// Only owner can upadet && before unlocked date
export const updateMessageService = async (
  messageId: number,
  userId: number,
  payload: { content?: string; unlockAt?: string }
) => {
  const message = await prisma.message.findUnique({
    where: { id: messageId },
  });

  if (!message) {
    throw new AppError("Message not found", 404);
  }


  if (message.userId !== userId) {
    throw new AppError("Unauthorized", 403);
  }

 
  if (new Date() >= message.unlockAt) {
    throw new AppError("Cannot update unlocked message", 400);
  }


  let newUnlockAt = message.unlockAt;
  if (payload.unlockAt) {
    const date = new Date(payload.unlockAt);
    if (date <= new Date()) {
      throw new AppError("unlockAt must be future", 400);
    }
    newUnlockAt = date;
  }

  const updated = await prisma.message.update({
    where: { id: messageId },
    data: {
      content: payload.content ?? message.content,
      unlockAt: newUnlockAt,
    },
  });

  return updated;
}



export const deleteMessageService = async (
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
    throw new AppError("Unauthorized", 403);
  }

  if (new Date() >= message.unlockAt) {
    throw new AppError("Cannot delete unlocked message", 400);
  }

  await prisma.message.delete({
    where: { id: messageId },
  });

  return null;
};


export const getPublicMessageService = async (shareId: string) => {
  const message = await prisma.message.findUnique({
    where: { shareId },
  });
  console.log("message",message)
  if (!message) {
    throw new AppError("Message not found", 404);
  }

  const now = new Date();

  const isUnlocked = now >= message.unlockAt;

  return {
    id: message.id,
    unlockAt: message.unlockAt,
    isUnlocked,
    content: isUnlocked ? message.content : "🔒 This message is locked",
  };
};