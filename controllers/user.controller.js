const e = require("express")
const User = require("../models/user.model")
const {hashPassword,comparePassword} = require("../services/bcrypt")
const {generateTokenForUser} = require("../services/tokenService")

const handleUserRegisterController = async(req,res)=>{
    // getting user data from body
    const {name,email,password} = req.body
    try {
        // validations is required
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                msg:"all fields required"
            })
        }
        // check if user exists 
        const existingUser = await User.findOne({email})
        // console.log(existingUser)
        if(existingUser){
            return res.status(400).json({
                success:false,
                msg:"User alreay exists"
            })
        }
        // hash password 
        const hashedPassword = await hashPassword(password)

        // save in database 
        User.create({name,email,password:hashedPassword})
        return res.status(201).json({
            success:true,
            msg:"Register successfully"
        })

    } catch (error) {
        console.log("error in user registration")
        console.log(error)
        return res.status(500).json({
            success:false,
            msg:"error in user registration"
        })
    }

}





// user login 

const handleUserLoginController = async(req,res)=>{
    // getting user data from the body 
    const {email,password} = req.body
    try {
        // checking is required validation 
        if(!email || !password){
            return res.status(400).json({
                success:false,
                msg:"all fields required"
            })
        }
        // checking if user exists 
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                msg:"invalid user or password"
            })
        }
        // compare password 
        const isMatched = await comparePassword(password,user.password)
        if(!isMatched){
            return res.status(400).json({
                success:false,
                msg:"incorrect password"
            })
        }
        // generate token for user 
        const token = generateTokenForUser(user)

        return res.status(200).json({
            success:true,
            msg:"login successfull",
            token,
            user:{
                name:user.name,
                email:user.email,
                profileImage:user.profileImageURL
            }
        })


        
    } catch (error) {
        return res.status(500).json({
            success:false,
            msg:"error in user login"
        })
    }

}

module.exports = {
    handleUserRegisterController,
    handleUserLoginController
}