import jwt from 'jsonwebtoken'
import config from './config'
import { Types } from 'mongoose'

interface Iuser {
    _id: Types.ObjectId,
    email: string | undefined
}

export function createdToken(user: Iuser) {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, config.jwtSecret, {
       expiresIn: 86400 
    })
}