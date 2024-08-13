const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true
    },
    subtitle:{
        type:String,
        require:true,
        trim:true
    },
    body:{
        type:String,
        require:true,
        trim:true
    },
    imageURL:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
},{timestamps:true})

const Blog = mongoose.model("Blog",blogSchema)

module.exports = Blog