

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const userModel = require('../models/userSchema')
let secretKey = 'shh';
let userController = (req,res)=>{
    let { name, email,isAdmin, password, confirmPassword} = req.body;
    if(!name || !email || !isAdmin || !password || !confirmPassword){
        return res.json("fields missing ")
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    // let Error = errors.array()
    // console.log(Error[0].msg)
    // return res.json({err : Error[0].msg});
    }
    if(password !== confirmPassword){
        return res.json({Error : "password and confirmPassword do not match "})
    }
    let hashedPassword = bcrypt.hashSync(password,10);
    password = hashedPassword;

    let user = new userModel({name,email, isAdmin, password})
    user.save((err,savedUser)=>{
        if(!err){
            return res.status(201).json({Success: "User registered",savedUser})

        }else{
            return res.json(err)
        }
    })  
}

let loginController = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.json("field missing");
    }  
    const user = await userModel.findOne({email : email})
    if(user == null){
        return res.json({Error : "no user registered with this email"})
    }
    let hashedPassword = user.password;
    let result = bcrypt.compareSync(password, hashedPassword)
    if(result == false){
        res.json({Error : "incorrect password"})
    }else{
        let token = jwt.sign({id : user._id},secretKey)
        return res.json({Success : "user loggedin",token})
    }
}

let getUsersController = async (req,res)=>{
    let users = await userModel.find();
    return res.json(users)
}

let checkTokenController = (req,res,next) =>{
    let token = req.headers.authorization
    try{
    let decode = jwt.verify(token, secretKey);
    console.log(decode)
    req.userId = decode.id
    next()
    // return res.json("test")
    }catch(err){
        return res.json("Invalid token");
    }
}

let isAdminController = async(req,res,next) =>{
    // let token = req.headers.authorization;
    // let decoded = jwt.verify(token,secretKey);
    // let id = decoded.id
    // console.log(req.userId);
    // return res.json("test")

    let userDetails = await userModel.findOne({_id : req.userId})

    if(userDetails.isAdmin == false){
        return res.json({Error : 'only admin can access this API'})
    }else{
        next()
    }
    // console.log(userDetails)
    // return res.json('test');




}
module.exports = {
    userController,
    loginController,
    getUsersController,
    checkTokenController,
    isAdminController
}