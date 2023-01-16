import { Router } from "express";

import authRoutes from "./authRoute.js";
import userRoutes from "./userRoute.js";
import studentsRoutes from "./studentRoute.js";
import homeRoute from "./homeRoute.js";
import attendanceRoute from "./studentAttendanceRoute.js";
import isAuth from "../middlewares/auth.js";

const router = Router();

router.use(authRoutes);
router.use("/myaccount/attendance", isAuth, attendanceRoute);
router.use("/myaccount/students", isAuth, studentsRoutes);
router.use("/myaccount/users", isAuth, userRoutes);
router.use("/myaccount", isAuth, homeRoute);

export default router;
