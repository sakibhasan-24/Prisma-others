import 'dotenv/config'
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utills/error";


export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
      const statusCode = err.statusCode || 500;
    if(err instanceof  AppError){
     return res.status( 500).json({
      success: false,
      message: err.message,
    });

    }
    if (process.env.NODE_ENV === "production") {
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }

    return res.status(500).json({
        success: false,
        message: "something went wrongs",
        errror: err,
    })
}