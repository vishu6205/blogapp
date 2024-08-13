const bcrypt = require("bcrypt")


const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword
    } catch (error) {
        console.log("can't hash password")
        console.log(error)
    }
}

const comparePassword = async (planePassword,hashedPassword) => {
    try {
        const isMatched = await bcrypt.compare(planePassword,hashedPassword)
        return isMatched
    } catch (error) {
        console.log("can't compare password")
        console.log(error)
    }
}

module.exports = { hashPassword , comparePassword }