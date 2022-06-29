const express = require("express");

const router = express.Router();

//auth controller
const publicController = require('../controllers/public')

router.get("/", publicController.getIndex);


module.exports = router;
