import { Router } from "express";
import { registerUser, loginUser, logout, verify } from "../controllers/user.controller";
import { validateToken } from "../middlewares/validateToken";

const router = Router()

router.post('/signup', registerUser)
router.post('/sigin', loginUser)
router.post('/logout', logout)
router.get('/verify', validateToken, verify)

export default router