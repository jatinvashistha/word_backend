import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import {User} from "../models/User.js"
import { sendToken } from "../utils/sendToken.js";
// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "cloudinary"
 

export const register = catchAsyncError(async(req,res,next)=>{
       const {name,email,password} = req.body;

        
       
 
    if(!name || !email  || !password ) 
    return next(new ErrorHandler("please enter all field", 400));

  let user = await User.findOne({ email });


 
  if(user)
   return next(new ErrorHandler("User Already exist",409))
        //upload file on cloudinary

        
 
        user = await User.create({
            name,
             email,
             password,
            
        });

    sendToken(res,user,"Registered Successfully");
 });



 //login

export const login = catchAsyncError(async (req, res, next) => {
    const { email,  password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please provide either email or phoneNumber and password", 400));

    let user;

    if (email) {
        user = await User.findOne({ email }).select("+password");
    }  

    if (!user)
        return next(new ErrorHandler("Incorrect Email or Phone Number or Password", 401));

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
        return next(new ErrorHandler("Incorrect Email or Phone Number or Password", 401));

    sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

  //logout
  export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  });

  // get my profile
  export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });

 
 
 
 