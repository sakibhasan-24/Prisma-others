import type { Request, Response } from "express";
import { tryCatchWrapper } from "../../utills/catchAsync";
import {createMessage } from "./message.service";
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