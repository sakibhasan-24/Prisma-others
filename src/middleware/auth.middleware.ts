import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utills/jwt";


export const loginValidation=(req:Request,res:Response,next:NextFunction)=>{
    // get token from header
    const token=req.headers.authorization;
    // console.log(token)
    if(!token){
        return res.status(401).json({message:"No token provided"})
    }
    // split token
    const bearerToken=token.split(" ")[1]
// console.log("BEARER",bearerToken)
    if (!bearerToken){
        return res.status(401).json({message:"Invalidssssss token",bearerToken})
    }
    // verify 
    // console.log(req.user)
   try {
     const decoded= verifyToken(bearerToken)
     console.log("decoded",decoded)
    if (!decoded){
        return res.status(401).json({message:"Invalidsss token"})
    }
    // add user to request
    req.user = {
      userId: decoded.userId,
    };

    next()
   } catch (error) {
    console.log(error)
    return res.status(401).json({message:"Invalidfdfdsd token"})
   }
}


