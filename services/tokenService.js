const JWT = require("jsonwebtoken")


const generateTokenForUser = (user)=>{
    try {
        const userPayload = {
            _id:user._id,
        }
        const token = JWT.sign(userPayload,`${process.env.JWT_SECRET}`,{expiresIn:"1d"})
        return token
    } catch (error) {
        console.log("error in generating token")
        console.log(error)
    }
}


module.exports = {generateTokenForUser}