import mongoose from "mongoose";
import dotenv from 'dotenv';
import config from "./config/config";
dotenv.config()

export const dbConnect = async () => {
    try {
        const db = await mongoose.connect(config.DB.URI)
        console.log('Database is connected to', db.connection.db.databaseName)
        return db.connection.db.databaseName
    } catch (error) {
     if (error instanceof Error) {
        console.log(error.message)
        return error.message
     }
     console.log(error)
     return error   
    }
}