import dotenv from 'dotenv'
dotenv.config

export default {
    jwtSecret: process.env.JWT_SECRET || 's',
    DB: {
        URI: process.env.MONGODB_URI || 's'
    }
}