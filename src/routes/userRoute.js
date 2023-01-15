import { Router } from "express";

import { all, create, form } from "../controllers/UserController.js"

const router = Router();

router.get("/all", all)
router.get("/new", form)
router.post("/new", create)

export default router;
