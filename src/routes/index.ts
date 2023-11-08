import { Router } from "express";
import fileRoutes from './file.routes';
import userRoutes from './user.routes'

const router = Router()

router.use('/api', fileRoutes)
router.use('/api', userRoutes)

export default router