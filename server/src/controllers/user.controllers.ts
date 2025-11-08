import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { ApiError } from "../utils/apiError.js";
import { findUserByEmail  } from "../utils/user.utils.js"
import { createUser } from "../services/user.service.js"
import User from "../models/user.models.js";
import Token from "../models/blackListToken.model.js"


export const createdUser = asyncHandler(
    async(req:Request,res:Response,_next:NextFunction)=> {

        const {username, email,password} = req.body;

        // Check if user exists (without password field)
        const userAlreadyExists = await findUserByEmail(email, false)
        if(userAlreadyExists){
            throw new ApiError(400, "User already exists")
        }
        const hashedPassword = await User.hashedPassword(password);

        const user = await createUser(
            {
                username,
                email,
                password:hashedPassword,
                isVerified:false
            }
        );

        const token = user.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Remove password from response
        const userResponse = user.toObject();
        const { password: _, ...userWithoutPassword } = userResponse;

        res.status(201).json({
            status:"success",
            data: userWithoutPassword
        });


})

export const loginUser = asyncHandler(
    async(req:Request,res:Response,_next:NextFunction)=>{

        const  { email,password} = req.body;

        // Get user with password for comparison
        const userAlreadyExists = await findUserByEmail(email, true);

        if(!userAlreadyExists){
            throw new ApiError(400, "User does not exist")
        }
        const isMatch = await userAlreadyExists.comparePassword(password);

        if(!isMatch){
            throw new ApiError(400, "Invalid credentials")
        }

        const token = userAlreadyExists.generateAuthToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Remove password from response
        const userResponse = userAlreadyExists.toObject();
        const { password: _, ...userWithoutPassword } = userResponse;

        res.status(200).json({
            status:"login success",
            data: userWithoutPassword
        });

       
        
    }
)

export const getProfile = asyncHandler(
    async(req:Request,res:Response,_next:NextFunction)=>{
        const user = req.user;
        
        // Remove password from response if it exists
        if (user) {
            const userResponse = user.toObject ? user.toObject() : user;
            const { password: _, ...userWithoutPassword } = userResponse as any;
            
            res.status(200).json({
                status:"User Profile",
                data: userWithoutPassword
            });
        } else {
            res.status(404).json({
                status:"error",
                message: "User not found"
            });
        }
    }
)

export const logoutUser = asyncHandler(
    async(req:Request,res:Response,_next:NextFunction)=>{
    res.clearCookie("token");
    const token = req.cookies.token  || req.headers.authorization?.split(" ")[1];
    
    await Token.create({token});
    
    res.status(200).json({
        message:"logout success"
    })
    }
)