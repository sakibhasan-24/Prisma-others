

// import bcrypt from "bcrypt";
// import { prisma } from "../../lib/prisma";
// import { createToken } from "../../utills/jwt";
// export const signUpUser=async (payload:any)=>{
//     console.log(payload)
//     const hashedPassword=await bcrypt.hash(payload.password,10)
//     const user=await prisma.user.create({
//         data:{
//             name:payload.name,
//             email:payload.email,
//             password:hashedPassword
//         }
//     })
//     const token=createToken({id:user.id,name:user.name,email:user.email})
//      return { user, token };
// }

import { prisma } from "../../lib/prisma";
import { AppError } from "../../utills/error";
import { comparePassword, hashedPassword } from "../../utills/hash";
import { createToken } from "../../utills/jwt";
import type { LoginInput, SignupInput } from "./auth.type";


export const signUpUser=async (payload:SignupInput)=>{
    // existing user
    const existingUser=await prisma.user.findUnique({
        where:{
            email:payload.email
        }
        })
        if(existingUser){
            throw new AppError("User already exists",409);
        }

        // hash password
        const hashPassword= hashedPassword(payload.password)
        // create user
        const user=await prisma.user.create({
            data:{
                name:payload.name,
                email:payload.email,
                password:hashPassword
            }
        })
        // create token
        const token=createToken({userId:user.id})

        return {token,user}
    
}


export const signInUser=async (payload:LoginInput)=>{
    // find user
    const user=await prisma.user.findUnique({
        where:{
            email:payload.email
        }
    })
    if(!user){
        throw new AppError("User not found",404)
    }
    // compare password
    const isPasswordMatch=await  comparePassword(payload.password,user.password)
    console.log(isPasswordMatch)
    if(!isPasswordMatch){
        throw new AppError("Invalid Credentials",401)
    }
    // create token
    const token=createToken({userId:user.id})
    const {password,...rest}=user
    return {token,rest}
}