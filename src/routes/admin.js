const express = require("express");

//protection of private routes
const isAuth = require('../middlewares/auth')

//controller
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-student",isAuth, adminController.getAddStudent);
router.post("/add-student",isAuth, adminController.postAddStudent);
router.get('/add-presence',isAuth, adminController.getAddPresence);
router.post("/add-presence",isAuth, adminController.postAddPresence);
router.get('/dashboard',isAuth, adminController.getIndex)
router.get("/",isAuth, adminController.getIndex);

module.exports = router;
