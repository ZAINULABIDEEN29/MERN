import { Types } from "mongoose";
import Todo from "../models/todos.models.js";
import  type { ITodo } from "../models/todos.models.js";


interface CreateTodoInput {
    content: string;
    completed?: boolean;
    createdBy: Types.ObjectId;
}

const createTodo = async ({ content, completed, createdBy }: CreateTodoInput): Promise<ITodo> => {
    if (!content || !createdBy) {
        throw new Error("All fields are required");
    }
    
    const todo = await Todo.create({
        content,
        completed: completed ?? false,
        createdBy
    });
    
    return todo;
};

export default createTodo;