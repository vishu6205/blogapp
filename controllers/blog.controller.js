const Blog = require("../models/blog.model")



const handleAddBlogController = async (req, res) => {
    const { title, subtitle, body, image } = req.body
    // await Blog.create({title,subtitle,body,createdBy:req.user})
    // const user = await User.findOne({_id:req.user})
    // return res.json({msg:"true",user})
    try {
        if (!title || !subtitle || !body || !image) {
            return res.status(400).json({
                success: false,
                msg: "all fields required"
            })
        }

        await Blog.create({
            title,
            subtitle,
            body,
            imageURL: image,
            createdBy: req.user
        })
        return res.status(201).json({
            success: true,
            msg: "Blog created"
        })
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Can't add blog" })
    }
}



// get all blog 

const handleGetAllBlogController = async (req, res) => {
    try {
        const AllBlogs = await Blog.find({}).populate({
            path: "createdBy",
            select: "-password"
        }).exec()

        if (!AllBlogs) {
            return res.status(200).json({
                success: false,
                msg: "No Blogs Available"
            })
        }
        return res.status(200).json({
            success: true,
            AllBlogs
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Can't get blogs"
        })
    }
}



// get blog by id 


const handleGetBlogController = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate({
                path: "createdBy",
                select: "-password -_id"
            })
            .exec()
        return res.status(200).json({
            success: true,
            blog
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Can't get blog"
        })
    }
}





// update blog by id 

const handleUpdateBlogController = async (req, res) => {
    const { title, subtitle, body, image } = req.body
    try {

        const updateBlog = await Blog.findByIdAndUpdate(req.params.id, { title,subtitle,body,imageURL:image }, { new: true})
        if(!updateBlog){
            return res.status(400).json({
                success: false,
                msg:"can't find blog",
                updateBlog
            })
        }
        return res.status(201).json({
            success: true,
            msg:"blog updated",
            updateBlog
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Can't update blog"
        })
    }

}



// delete blog by id 


const handleDeleteBlogController = async(req,res)=>{
    try {
        await Blog.findByIdAndDelete(req.params.id)
        return res.status(201).json({
            success: true,
            msg:"blog deleted"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Can't delete blog"
        })
    }
}


module.exports = {
    handleAddBlogController,
    handleGetAllBlogController,
    handleGetBlogController,
    handleUpdateBlogController,
    handleDeleteBlogController
}