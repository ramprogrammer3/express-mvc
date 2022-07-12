const mongoose =require("mongoose")

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true
    },
    password : {
        type : String,
        required : true
    }
});

let userModel = mongoose.model("user", userSchema)
module.exports = userModel;