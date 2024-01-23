import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],

    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:validator.isEmail
    } ,
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[6,"password must be at least 6 characters"],
        select:false,
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    },
    


});

schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

schema.methods.getJWTToken = function (){
    return jwt.sign({_id: this._id},process.env.JWT_SECRET,{
        expiresIn:"15 days"
    })
}
schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  

export const User = mongoose.model("User",schema)