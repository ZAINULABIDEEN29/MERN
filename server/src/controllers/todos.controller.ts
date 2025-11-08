import type { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import Todo from "../models/todos.models.js";
import createTodo from "../services/todo.service.js";

export const createTodos = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
        const { content } = req.body;
        const user = req.user._id;

        if (!content || !content.trim()) {
            throw new Error("Content is required");
        }

        const trimmedContent = content.trim();

        
        const contentAlreadyExists = await Todo.findOne({ 
            content: trimmedContent,
            createdBy: user 
        });
        
        if (contentAlreadyExists) {
            throw new Error("Todo already exists");
        }

        const todo = await createTodo({ 
            content: trimmedContent,
            createdBy: user
        });

        res.status(201).json({
            success: true,
            todo
        });
    }
);

export const getSingleTodo = asyncHandler(
    async(req:Request,res:Response,_next:NextFunction)=>{
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if(!todo){
            throw new Error("Todo not found");
        }

        res.status(200).json({
            success:true,
            todo
        })
    }
)

export const  getTodos = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
        const user = req.user._id;
        const todos = await Todo.find({ createdBy: user });

        res.status(200).json({
            success: true,
            todos
        });
    }
)

export const updateTodo = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) =>{
        const { id } = req.params;
        const { content, completed } = req.body;

        const todo = await Todo.findByIdAndUpdate(id, { content, completed }, { new: true });
        if(!todo){
            throw new Error("Todo not found");
        }

        res.status(200).json({
            success: true,
            todo
        });


    }
)

export const deleteTodo = asyncHandler(
    async(req:Request,res:Response,_next:NextFunction)=>{
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo){
            throw new Error("Todo not found");
        }

        res.status(200).json({
            success:true,
            message:"Todo deleted successfully"
        })
        }
)