
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { createToken } from "../../utills/jwt";
export const signUpUser=async (payload:any)=>{

    //TODO: implement signUpUser
    const hashedPassword=await bcrypt.hash(payload.password,10)
    const user=await prisma.user.create({
        data:{
            name:payload.name,
            email:payload.email,
            password:hashedPassword
        }
    })
    const token=createToken({id:user.id,name:user.name,email:user.email})
     return { user, token };
}