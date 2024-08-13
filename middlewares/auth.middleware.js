const JWT = require("jsonwebtoken")
const requireSignIn = (req,res,next)=>{
    const headersTokenValue = req.headers['authorization']
    if(!headersTokenValue){
        return res.json({success:false,msg:"not access"})
    }
    try {
        const decode  = JWT.verify(headersTokenValue,`${process.env.JWT_SECRET}`)
        req.user = decode._id
        // console.log(req.user)
        next()
    } catch (error) {
        return res.status(500).json({success:false,msg:"unauthorized access"})
    }
}


module.exports = {requireSignIn}