import type { Request, Response } from "express";
import { tryCatchWrapper } from "../../utills/catchAsync";
import {createMessage, deleteMessageService, getAllMessagesService, getPublicMessageService, getSingleMessageService, updateMessageService } from "./message.service";
import { sendResponse } from "../../utills/response";

export const createMessageController=tryCatchWrapper(async (req:Request,res:Response)=>{
    // console.log(req?.user,"req.user")
    const userId=req.user!.userId;
    // console.log(req.user!)
    const result=await  createMessage(userId,req.body);
    console.log(result)
    sendResponse({
    res,
    statusCode: 201,
    message: "Message created successfully",
    data: result,
  });
})

export const getSingleMessage = tryCatchWrapper( async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const messageId = Number(req.params.id);

  const result = await getSingleMessageService(messageId, userId);

  sendResponse({
    res,
    statusCode: 200,
    message: "Message fetched successfully",
    data: result,
  });
});


export const getAllMessages =tryCatchWrapper( async (req: Request, res: Response) => {
  const userId = req.user!.userId;

  const result = await getAllMessagesService(userId);
  // console.log(result)
  sendResponse({
    res,
    statusCode: 200,
    message: "Messages fetched successfully",
    data: result,
  });
});


export const updateMessage =tryCatchWrapper( async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const messageId = Number(req.params.id);

  const result = await updateMessageService(
    messageId,
    userId,
    req.body
  );

  sendResponse({
    res,
    statusCode: 200,
    message: "Message updated",
    data: result,
  });
});

export const deleteMessage =tryCatchWrapper (async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const messageId = Number(req.params.id);

  await deleteMessageService(messageId, userId);

  sendResponse({
    res,
    statusCode: 200,
    message: "Message deleted",
    data: null,
  });
});

export const getPublicMessage = tryCatchWrapper( async (req: Request, res: Response) => {
  const { shareId } = req.params as { shareId: string };
  // console.log("shareId",shareId)
  const result = await getPublicMessageService(shareId) ;

  sendResponse({
    res,
    statusCode: 200,
    message: "Public message fetched",
    data: result,
  });
});