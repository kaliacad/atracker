import { Router } from "express";

const router = Router();

//auth controller
import { getLogin, postLogin, postLogout } from "../controllers/auth.js";

router.get("/login", getLogin);
router.post("/login", postLogin);
router.post("/logout", postLogout);

export default router;
