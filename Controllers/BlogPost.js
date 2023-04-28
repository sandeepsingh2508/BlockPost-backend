const Post=require('../Models/BlogPostSchema')
const catchAsyncError=require('../Middlewares/CatchAsyncError')
const ErrorHandler=require('../Utils/ErrorHandler')

//Create Post
exports.createNewPost=catchAsyncError(async(req,res,next)=>{
    const {title,content}=req.body
    const post=await Post.create({
        title,
        content,
        timestamp:Date.now(),
        userId:req.user._id
    })
    res.status(200).json({
        status:'success',
        message:'new post has created',
        post
    })
})

//Read All post
exports.readAllPosts=catchAsyncError(async(req,res,next)=>{
    const post=await Post.find()
    res.status(200).json({
        status:'success',
        post
    })
})

//Read Single Post
exports.readSinglePost=catchAsyncError(async(req,res,next)=>{
    const post=await Post.findById(req.params.id)
    if(!post){
        return next(new ErrorHandler('Such post id is not present',404))
    }
    res.status(200).json({
        status:'success',
        post
    })
})
//Update post
exports.updatePost=catchAsyncError(async(req,res,next)=>{
    let post=await Post.findById(req.params.id)
    if(!post){
        return next(new ErrorHandler('Such post is not present',404))
    }
    await Post.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndMidify: false,
    })
    res.status(200).json({
        status:'success',
        message:'Post has updated'
    })
})

//Delete Post
exports.deletePost=catchAsyncError(async(req,res,next)=>{
    const post=await Post.findById(req.params.id)
    if(!post){
        return next(new ErrorHandler('Such post id not present',404))
    }
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:'success',
        message:'post has deleted'
    })
})