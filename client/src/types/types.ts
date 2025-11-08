export interface Todo {
    _id: string;
    content: string;
    completed: boolean;
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    status: string;
    data: User;
}

export interface TodosResponse {
    success: boolean;
    todos: Todo[];
}

export interface TodoResponse {
    success: boolean;
    todo: Todo;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export interface CreateTodoData {
    content: string;
    completed?: boolean;
}

export interface UpdateTodoData {
    content?: string;
    completed?: boolean;
}