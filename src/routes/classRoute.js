import { Router } from "express";

import { classIndex, classCreateGet, classCreatePost } from "../controllers/classController.js"

const router = Router();

router.get("/all", classIndex)
router.get("/new", classCreateGet)
router.post("/all", classCreatePost)

export default router;
