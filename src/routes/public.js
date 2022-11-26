import { Router } from "express";

// auth controller
import getIndex from "../controllers/public.js";

const router = Router();

router.get("/", getIndex);

export default router;
