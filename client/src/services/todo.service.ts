import api from "./api";
import type {
    TodosResponse,
    TodoResponse,
    CreateTodoData,
    UpdateTodoData,
    Todo,
} from "../types/types";

export const todoService = {
    getTodos: async (): Promise<Todo[]> => {
        const response = await api.get<TodosResponse>("/api/todos/get-todos");
        return response.data.todos;
    },

    getTodo: async (id: string): Promise<Todo> => {
        const response = await api.get<TodoResponse>(`/api/todos/get-todo/${id}`);
        return response.data.todo;
    },

    createTodo: async (data: CreateTodoData): Promise<Todo> => {
        const response = await api.post<TodoResponse>(
            "/api/todos/create-todo",
            data
        );
        return response.data.todo;
    },

    updateTodo: async (id: string, data: UpdateTodoData): Promise<Todo> => {
        const response = await api.put<TodoResponse>(
            `/api/todos/update-todo/${id}`,
            data
        );
        return response.data.todo;
    },

    deleteTodo: async (id: string): Promise<{ success: boolean; message: string }> => {
        const response = await api.delete<{ success: boolean; message: string }>(
            `/api/todos/delete-todo/${id}`
        );
        return response.data;
    },
};

