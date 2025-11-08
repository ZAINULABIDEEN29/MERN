import User from "../models/user.models.js";
import type { UserInput } from "../validator/user.validator.js";

export const createUser = async ({
        username, 
        email,
        password,
        isVerified = false
}:UserInput)=>{

    if(!username || !email || !password){
        throw new Error("Username, email, and password are required");
    }
 const user = await User.create({
        username,
        email,
        password,
        isVerified: isVerified !== undefined ? isVerified : false
    });
    return user;
}

