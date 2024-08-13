const express = require("express")
const dotenv = require("dotenv").config()
const {connectToMongoDB} = require("./coonectDB")
const cors = require("cors")
const userRoutes = require("./routes/user.route")
const blogRotes = require("./routes/blog.route")
const commentRoutes = require("./routes/comment.route")

// const {requireSignIn} = require("./middlewares/auth.middleware")
const app = express()

const PORT = process.env.PORT || 8000
const mongoURL = `${process.env.MONGO_URL}`

app.use(express.json())
app.use(cors())


app.use("/api/v1/user",userRoutes)
app.use("/api/v1/blog",blogRotes)
app.use("/api/v1/comments",commentRoutes)


connectToMongoDB(mongoURL)
.then(()=>app.listen(PORT,()=>console.log(`server started at PORT : ${PORT}`)))
.catch(()=>console.log("can't run app.Unable to coonect the database"))

app.get("/",(req,res)=>{
    res.json("API is Working")
})
