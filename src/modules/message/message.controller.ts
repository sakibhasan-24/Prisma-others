import type { Request, Response } from "express";
import { tryCatchWrapper } from "../../utills/catchAsync";
import {createMessage, getAllMessagesService, getSingleMessageService } from "./message.service";
import { sendResponse } from "../../utills/response";

export const createMessageController=tryCatchWrapper(async (req:Request,res:Response)=>{
    console.log(req?.user,"req.user")
    const userId=req.user!.userId;
    // console.log(req.user!)
    const result=await  createMessage(userId,req.body);
    // console.log(result)
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

  sendResponse({
    res,
    statusCode: 200,
    message: "Messages fetched successfully",
    data: result,
  });
});