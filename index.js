const express = require('express')
const app = express()
const port = 8080;
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const secretkey = 'shh';
const userRoutes = require("./views/userRoutes")
app.use(express.json())
app.use(userRoutes);

const uri = "mongodb+srv://ramkumar:334300@cluster0.ihgbh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("DB connection successful")})
.catch(()=>{console.log("DB connection failed ")})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})


