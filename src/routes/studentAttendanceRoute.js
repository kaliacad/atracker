import { Router } from "express";

import { getAddPresence, postAddPresence } from "../controllers/admin.js";

const router = Router();

router.get("/all", getAddPresence);
router.post("/new", postAddPresence);


export default router;
