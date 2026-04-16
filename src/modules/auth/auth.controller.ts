import type {Request, Response } from "express";
import { signUpUser } from "./auth.service";

export const signUp=async(req:Request,res:Response) =>{
    //signup logic
    try {
        
        const result=await signUpUser(req.body)
     res.status(201).json({message:"User Created Successfully",result})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal Server Error",error})
    }
}
