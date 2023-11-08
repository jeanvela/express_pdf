import config from "../config/config";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from 'jsonwebtoken';

interface User {
    _id: string,
    username: string
    email: string
}

type TokenError = VerifyErrors | null


export function validateToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies
    if (!token) return res.status(404).json({message: 'No token, authorization denied'})
    jwt.verify(token, config.jwtSecret, (err: TokenError, user: any) => {
        if (err) return res.status(401).json({message: 'Invalid token'})
        req.user = user
        next()
    })
}
