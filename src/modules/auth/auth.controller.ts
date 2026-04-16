// import type {Request, Response } from "express";
// import { signUpUser } from "./auth.service";

import type { Request, Response } from "express";
import  { tryCatchWrapper } from "../../utills/catchAsync";
import { signUpUser } from "./auth.service";
import { sendResponse } from "../../utills/response";

// export const signUp=async(req:Request,res:Response) =>{
//     //signup logic
//     try {
        
//         const result=await signUpUser(req.body)
//      res.status(201).json({message:"User Created Successfully",result})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message:"Internal Server Error",error})
//     }
// }

export const signUp=tryCatchWrapper(async(req:Request,res:Response) =>{
    const result=await signUpUser(req.body)
    sendResponse({
        res,
        statusCode:201,
        message:"User Created Successfully",
        data:result
    })
    
})