import { Router } from "express";

// auth controller
import { form, login, logout } from "../controllers/AuthController.js";

const router = Router();

router.get("/", form);
router.post("/", login);
router.post("/logout", logout);

export default router;
