import { Router } from "express";

// auth controller
import { form, login, logout } from "../controllers/AuthController.js";

const router = Router();

router.post("/", login);
router.get("/", form);
router.post("/logout", logout);

export default router;
