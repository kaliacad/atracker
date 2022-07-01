const express = require("express");
const path = require("path");

//controller
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-student", adminController.getAddStudent);
router.post("/add-student", adminController.postAddStudent);
router.get('/add-presence', adminController.getAddPresence);
router.post("/add-presence", adminController.postAddPresence);
router.get('/dashboard', adminController.getIndex)
router.get("/", adminController.getIndex);

module.exports = router;
