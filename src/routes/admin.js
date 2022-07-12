const express = require("express");

//protection of private routes
const isAuth = require('../middlewares/auth')

//controller
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-student",isAuth, adminController.getAddStudent);
router.post("/add-student",isAuth, adminController.postAddStudent);
router.get('/add-presence',isAuth, adminController.getAddPresence);
router.post("/add-presence", isAuth, adminController.postAddPresence);
router.get('/students', isAuth, adminController.getStudents);
router.get('/students/:id', adminController.getSingleStudent);
router.post("/students/delete", isAuth, adminController.postDeleleStudent);
router.post("/students/edit", adminController.postEditStudent);
router.get("/",isAuth, adminController.getIndex);

module.exports = router;
