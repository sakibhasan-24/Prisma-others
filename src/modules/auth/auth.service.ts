
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
import { hashedPassword } from "../../utills/hash";
import { createToken } from "../../utills/jwt";
import type { SignupInput } from "./auth.type";


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
        const token=createToken({id:user.id,name:user.name,email:user.email})

        return {token,user}
    
}