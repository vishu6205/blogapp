const express = require("express")
const Blog = require("../models/blog.model")

const {
    handleAddBlogController,
    handleGetAllBlogController,
    handleGetBlogController,
    handleUpdateBlogController,
    handleDeleteBlogController
} = require("../controllers/blog.controller")
const { requireSignIn } = require("../middlewares/auth.middleware")
const router = express.Router()



// get all blogs 
router.get("/all-blogs", handleGetAllBlogController)

// get blog by id 
router.get("/get-blog/:id", handleGetBlogController)




// add a blog 
router.post("/add-blog", requireSignIn, handleAddBlogController)

// update blog by id 
router.put("/update-blog/:id", requireSignIn, handleUpdateBlogController)

// delete blog by id 
router.delete("/delete-blog/:id", requireSignIn, handleDeleteBlogController)



// get  single user blog 
router.get("/my-blogs", requireSignIn,async(req,res)=>{
    try {
        
        const blogs = await Blog.find({createdBy:req.user})
        if(!blogs){
            return res.status(400).json({
                success: false,
                msg:"No blogs created"
            })
        }
        return res.status(200).json({
            success: true,
            blogs
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Can't get blog"
        })
    }
})


module.exports = router