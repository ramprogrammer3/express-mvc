
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userModel = require('../models/userSchema')
const { body, validationResult } = require('express-validator');
const {userController,loginController,getUsersController,checkTokenController,isAdminController} = require("../controllers/userControllers")


router.post("/register",
body('email', "email is required ").isEmail(),userController);

router.post("/login", loginController)

router.get("/users",checkTokenController,isAdminController,getUsersController)
module.exports = router;