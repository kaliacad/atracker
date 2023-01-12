import { Router } from "express";

import userRoutes from "./userRoute.js";
import authRoutes from "./authRoute.js";

const router = Router();

router.use("/myaccount", userRoutes);
router.use(authRoutes);

export default router;
