import { Router } from "express";

// controller
import {
    getAddStudent,
    postAddStudent,
    getStudents,
    getSingleStudent,
    postDesactivateStudent,
    postEditStudent,
} from "../controllers/admin.js";

const router = Router();

router.get("/new", getAddStudent);
router.post("/new", postAddStudent);
router.get("/all", getStudents);
router.get("/:id", getSingleStudent);
router.post("/delete", postDesactivateStudent);
router.post("/edit", postEditStudent);

export default router;
