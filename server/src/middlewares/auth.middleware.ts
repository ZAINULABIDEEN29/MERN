import type { Request,Response,NextFunction } from "express";
import User from "../models/user.models.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "./asyncHandler.middleware.js";
import Token from "../models/blackListToken.model.js";



export const authUser = asyncHandler(
    async(req:Request,_res:Response,next:NextFunction)=> {

    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        throw new ApiError(401,"Unauthorized")
    }

    const isBlackListedToken  = await Token.findOne({token:token});
    if(isBlackListedToken){
        throw new ApiError(401,"Unauthorized")
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET || "") as JwtPayload;

    if (!decoded || typeof decoded !== "object" || !decoded.id) {
       throw new ApiError(401, "Invalid token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
       throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
    
}
)