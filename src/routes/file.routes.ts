import { Router } from "express";
import { getallPdf, getByIdPdf ,createPdf, getAllPdfUser, deletePdf } from "../controllers/file.controller";
import { validateToken } from '../middlewares/validateToken'

const router = Router()

router.get('/file', validateToken, getallPdf)
router.get('/file/:id', validateToken, getByIdPdf)
router.get('/userpdfs', validateToken, getAllPdfUser)
router.post('/file', validateToken, createPdf)
router.delete('/file', validateToken, deletePdf)

export default router