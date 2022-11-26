import { Router } from "express";

const router = Router();

//auth controller
import { getIndex } from "../controllers/public.js";

router.get("/", getIndex);

export default router;
