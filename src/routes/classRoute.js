import { Router } from "express";

import { all } from "../controllers/classController.js"

const router = Router();

router.get("/all", all)

export default router;
