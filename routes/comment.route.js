const express = require("express")
const Comment = require("../models/comment.model")
const {requireSignIn} = require("../middlewares/auth.middleware")
const router = express.Router()



router.get("/get-comment",async(req,res)=>{
    const comments = await Comment.find({}).populate({
        path:"createdBy",
        select:"-password"
    })
    return res.status(200).json({
        success:true,
        comments
    })
})


router.post("/comment",requireSignIn,async(req,res)=>{
    const {content,blogId} = req.body

    if(!content){
        return res.json({
            success:false,
            msg:"Please share a comment"
        })
    }
    await Comment.create({createdBy:req.user,content,blogId})
    return res.status(201).json({
        success:true,
        msg:"Done"
    })
})

module.exports = router