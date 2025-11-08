import User from "../models/user.models.js";
import Todo from "../models/todos.models.js";

export const findUserById = async (id:string)=>{
    return await User.findById(id);
}

export const findUserByEmail  = async(email:string, includePassword: boolean = false)=>{
    // Include password field only when needed (e.g., for login comparison)
    if (includePassword) {
        return await User.findOne({email}).select('+password');
    }
    return await User.findOne({email});
}

 const getTodosByUser = async(id:string)=>{
    return await Todo.find({createdBy:id});
}