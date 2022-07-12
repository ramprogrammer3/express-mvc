console.log("*********************************************************")

const express = require('express')
const app = express()
const port = 8080;
const jwt = require('jsonwebtoken')
const secretkey = 'shh';
app.use(express.json())
app.post("/signin",(req,res)=>{
    const {email,password} = req.body;
    const token = jwt.sign(email,secretkey)
    res.json(token)
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})



const token = jwt.sign({email : email},secretkey)

console.log("*********************************************************")
const express = require('express')
const app = express()
const port = 8080;
const jwt = require('jsonwebtoken')
const secretkey = 'shh';
app.use(express.json())
app.post("/signin",(req,res)=>{
    const {email,password} = req.body;
    const token = jwt.sign({email : email},secretkey)
    res.json(token)
})
app.get("/products",(req,res)=>{
    let token = req.headers.authorization
    if(!token){
        return res.json("no token provided ")
    }else{
        try{
            jwt.verify(token,secretkey)
            return res.json("product data ")
        }catch(err){
            return res.json("invalid token")
        }
    }
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})


const token = jwt.sign({email : email},secretkey, {expiresIn : "20s"})


console.log("*********************************************************")


console.log("*********************************************************")