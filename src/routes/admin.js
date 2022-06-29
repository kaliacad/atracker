const express = require("express");
const path = require("path");

//controller
const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/add-student/:idUser", adminController.getAddStudent);
router.post("/add-student", adminController.postAddStudent);
router.get('/dashboard', adminController.getIndex)

module.exports = router;
