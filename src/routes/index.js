import { Router } from "express";

import userRoutes from "./userRoute.js"
import authRoutes from "./auth.js"

const router = Router()

router.use('/admin', userRoutes)
router.use(authRoutes)

export default router;
