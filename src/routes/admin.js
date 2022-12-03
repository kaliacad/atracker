import { Router } from "express";

// protection of private routes
import isAuth from "../middlewares/auth.js";

// controller
import {
    getAddStudent,
    postAddStudent,
    getAddPresence,
    postAddPresence,
    getStudents,
    getSingleStudent,
    postDeleleStudent,
    postEditStudent,
    getIndex,
    getUsers,
    postUser,
    getUserForm
} from "../controllers/admin.js";

const router = Router();

router.get("/", isAuth, getIndex);

// students route
router.get("/add-student", isAuth, getAddStudent);
router.post("/add-student", isAuth, postAddStudent);
router.get("/add-presence", isAuth, getAddPresence);
router.post("/add-presence", isAuth, postAddPresence);
router.get("/students", getStudents);
router.get("/students/:id", getSingleStudent);
router.post("/students/delete", isAuth, postDeleleStudent);
router.post("/students/edit", postEditStudent);

// users routes
router.get("/users", isAuth, getUsers);
router.get("/add-user", isAuth, getUserForm);
router.post("/add-user", isAuth, postUser);


export default router;
