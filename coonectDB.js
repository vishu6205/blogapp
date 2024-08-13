const mongoose = require("mongoose")

const connectToMongoDB = async(url)=>{
    try {
        const coonect = await mongoose.connect(url)
        console.log("database connected successfully")
    } catch (error) {
        console.log("error in database connection")
        console.log(error)
    }
}


module.exports = {connectToMongoDB}