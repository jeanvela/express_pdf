import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
})

export interface CloudinaryResult {
    original_filename: string
    secure_url: string
    public_id: string
}

export const uploadPdf = async (filePath: string): Promise<CloudinaryResult | any>=> {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'pdfs',
            resource_type: 'raw'
        })
        return result
    } catch (error) {
        return error
    }
}