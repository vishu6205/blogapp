const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    profileImageURL:{
        type:String,
        default:"/images/userprofile/user.png"
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User