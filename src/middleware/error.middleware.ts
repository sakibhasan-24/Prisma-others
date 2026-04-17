import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utills/error";


export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof  AppError){
     return res.status( 500).json({
      success: false,
      message: err.message,
    });

    }

    return res.status(500).json({
        success: false,
        message: "something went wrongs",
        errror: err.name,
    })
}