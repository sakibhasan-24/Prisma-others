import 'dotenv/config'

import jwt from 'jsonwebtoken'



// create token
export const createToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '7d'
    })
}

// verify token
export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string)
}