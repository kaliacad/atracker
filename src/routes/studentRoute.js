import { Router } from "express";

// controller
import {
    getAddStudent,
    postAddStudent,
    getStudents,
    getSingleStudent,
    deleleStudent,
    postEditStudent,
} from "../controllers/admin.js";

const router = Router();

router.get("/new", getAddStudent);
router.post("/new", postAddStudent);
router.get("/all", getStudents);
router.get("/:id", getSingleStudent);
router.delete("/:id", deleleStudent);
router.post("/edit", postEditStudent);

export default router;
