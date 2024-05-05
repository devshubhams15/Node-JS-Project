import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true
        },
        avatar: {
            type: String,   // Cloudinary url
            required: true,
        },
        coverImage: {
            type: String,   // Cloudinary url
            required: true,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String
        },
        refreshToken: {
            type: String
        }

    }, {
    timestamps: true
})


userSchema.pre('passwrod',async function(next){
    if(!this.isModified('password')) return next()
    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=async function(){
    jwt.sign(
    {
        _id:this._id,
        username:this.username,
        fullname:this.fullname,
        email:this.email

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    
    ) 

}


userSchema.methods.generateRefreshToken=async function(){
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
            fullname:this.fullname,
            email:this.email
    
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
        
        ) 
}


export const User = mongoose.model("User", userSchema)