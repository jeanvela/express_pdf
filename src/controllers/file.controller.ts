import Pdf from '../models/pdf'
import { Request, Response } from 'express'
import { uploadPdf, CloudinaryResult } from '../config/cloudinary'
import fs from 'fs-extra'

export const getallPdf = async (req: Request, res: Response) => {
    try {
        const allPdf = await Pdf.find()
        return res.status(200).json(allPdf)
    } catch (error) {
        return res.status(404).json({error: error})
    }
}

export const getByIdPdf = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const onePdf = await Pdf.findById(id)
        
        if (!onePdf) throw new Error('Not found Pdf')

        return res.status(200).json(onePdf)
    } catch (error) {
        return res.status(404).json({error: error})
    }
}

export const getAllPdfUser = async (req: Request, res: Response) => {
    const id: any = req.user
    try {
        const allPdfUser = await Pdf.find({
            userId: id._id
        })
        return res.status(200).json(allPdfUser)
    } catch (error) {
        return res.status(404).json({message: error})
    }
}

export const createPdf = async (req: Request, res: Response) => {
    const file: string | undefined = req.file?.path
    const id: any = req.user
    try {
        if (!file) throw new Error('file path not found')
        const result: CloudinaryResult = await uploadPdf(file)
        const createdPdf = new Pdf({
            fielName: result.original_filename,
            filePathUrl: result.secure_url,
            public_id: result.public_id,
            userId: id._id
        })
        await createdPdf.save()
        await fs.unlink(file)
        console.log(createdPdf)
        return res.status(200).send('seccess')
    } catch (error: any) {
        return res.status(404).json({message: error.message})
    }
}

export const deletePdf = async (req: Request, res: Response) => {
    try {
        
        res.status(200).send('delete')
    } catch (error) {
        return res.status(404).json({message: error})
    }
}