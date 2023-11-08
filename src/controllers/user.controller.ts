import User from '../models/user'
import { Request, Response } from 'express'
import { hashPassword, comparePassword } from '../libs/hashPassword'
import { createdToken } from '../config/token'

interface MyError extends Error {
    status?: number
}

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {
        const passwordHash = await hashPassword(password)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
        await newUser.save()
        return res.status(200).send('User created')
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 401).json({ error: myError.message });
    }
}


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const hola = req.user
        const user = await User.findOne({email})
        if (!user) throw new Error('invalid credentials')
        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) throw new Error('invalid credentials')
        const token = createdToken({_id: user._id, email: user.email})

        return res.status(200).cookie('token', token).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } catch (error) {
        const myError = error as MyError
        return res.status(myError.status || 401).json({ error: myError.message });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        return res.status(200).cookie('token', '', {
            expires: new Date(0)
        }).send('logout')
    } catch (error) {
        console.log(error)
        return res.status(404).json({error: error})
    }
}

export const verify = async (req: Request, res: Response) => {
    const user: any = req.user
    try {
        const oneUser = await User.findById(user._id)
        return res.status(200).json({
            _id: oneUser?._id,
            username: oneUser?.username,
            email: oneUser?.email
        })
    } catch (error) {
        return res.status(401).json({error: error})
    }
}