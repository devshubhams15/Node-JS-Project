import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async (req,res)=>{

    // return res.status(200).json({
    //     message:"Register success!"
    // })


    const {fullname,email,username,password}=req.body
    //console.log("fullname",[fullname,email,username,password].some((field)=>{field?.trim()==="" }));

    if([fullname,email,username,password].some((field)=>{field?.trim() === "" })){
        // return res.status(400).json({
        //     message:"failed"
        // })
        throw new ApiError(400,"All fields are required !")
         
    }

    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    console.log("existedUser",existedUser);

    if(existedUser){
        throw new ApiError(409,"User with username or email already exist")
    }

    const avatarLocalpath=req.files?.avatar[0]?.path
    let coverImageLocalpath

    if(req.files.coverImage && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
        coverImageLocalpath=req.files.coverImage[0].path
    }


    if(!avatarLocalpath){
        throw new ApiError(409,"Avatar files is required !")
    }


    const avatar= await uploadOnCloudinary(avatarLocalpath)
    const coverImage= await uploadOnCloudinary(coverImageLocalpath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required !")
    }

    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    console.log("user",user);

    const createdUser= await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(400,"Something failed while creating user !")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully ! ")
    )



})

export {registerUser}