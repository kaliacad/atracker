import { Router } from "express";

import { all, create, form } from "../controllers/UserController.js"
import isAuth from "../middlewares/auth.js";

const router = Router();

router.get("/users", isAuth, all)
router.get("/add-user", isAuth, form)
router.post("/add-user", isAuth, create)

export default router;
