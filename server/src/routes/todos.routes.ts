import express from "express"
const router = express.Router();
import { createTodos, getTodos, getSingleTodo, updateTodo, deleteTodo } from "../controllers/todos.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { todoSchema } from "../validator/todo.validator.js";



router.post("/create-todo", authUser, validate(todoSchema), createTodos);
router.get("/get-todos", authUser, getTodos);
router.get("/get-todo/:id", authUser, getSingleTodo);
router.put("/update-todo/:id", authUser, validate(todoSchema.partial()), updateTodo);
router.delete("/delete-todo/:id", authUser, deleteTodo);


export default router;
