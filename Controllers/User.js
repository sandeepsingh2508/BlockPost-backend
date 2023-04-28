const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncError = require("../Middlewares/CatchAsyncError");
const sendToken = require("../Utils/JwtToken");
const User = require("../Models/UserSchema");
const crypto = require("crypto");

//register user
exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //checking if user has given email or password
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 401));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Logout
exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//get all Users
exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
  const  users=await User.find()
  res.status(200).json({
    success:true,
    users
  })
})
//get  single user
exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
  const  user=await User.findById(req.params.id)
  if(!user){
    return next(new ErrorHandler(`User does not exist with id:${req.params.id}`))
  }
  res.status(200).json({
    success:true,
    user
  })
})
