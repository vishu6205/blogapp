const express = require("express")
const {handleUserRegisterController,handleUserLoginController} = require("../controllers/user.controller")
const {requireSignIn} = require("../middlewares/auth.middleware")
const User = require("../models/user.model")
const router = express.Router()


router.post("/register",handleUserRegisterController)
router.post("/login",handleUserLoginController)

// private route 
router.get("/auth",requireSignIn,(req,res)=>{
    return res.json({ok:true})
})

router.get("/dashboard",requireSignIn,async(req,res)=>{
    const user = await User.findById(req.user).select("-password")
    return res.status(200).json({user})
})







module.exports = router