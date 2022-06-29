const express = require("express");
const path = require('path')

//controller
const adminController = require('../controllers/admin')

const router = express.Router();

router.get("/", adminController.getIndex);

module.exports = router;
