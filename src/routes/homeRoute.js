import { Router } from "express";

import { getIndex } from "../controllers/admin.js";

const router = Router();

router.get("/summary", getIndex);

export default router;
