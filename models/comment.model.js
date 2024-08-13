const mongoose = require("mongoose")

const commentSChema = new mongoose.Schema({
    content:{
        type:String,
        require:true,
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog',
        require:true
    }
},{timestamps:true})

const Comment = mongoose.model("Comment",commentSChema)

module.exports = Comment