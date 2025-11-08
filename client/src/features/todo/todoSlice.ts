import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Todo, CreateTodoData, UpdateTodoData } from "../../types/types";
import { todoService } from "../../services/todo.service";
import { logoutUser } from "../auth/authSlice";

interface TodoState {
    items: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const todos = await todoService.getTodos();
            return todos;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to fetch todos"
            );
        }
    }
);

export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (newTodo: CreateTodoData, { rejectWithValue }) => {
        try {
            const todo = await todoService.createTodo(newTodo);
            return todo;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to create todo"
            );
        }
    }
);

export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async (
        { id, data }: { id: string; data: UpdateTodoData },
        { rejectWithValue }
    ) => {
        try {
            const todo = await todoService.updateTodo(id, data);
            return todo;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to update todo"
            );
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id: string, { rejectWithValue }) => {
        try {
            await todoService.deleteTodo(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to delete todo"
            );
        }
    }
);

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetTodos: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch todos
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Add todo
        builder
            .addCase(addTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Update todo
        builder
            .addCase(updateTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (todo) => todo._id === action.payload._id
                );
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Delete todo
        builder
            .addCase(deleteTodo.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (todo) => todo._id !== action.payload
                );
                state.error = null;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.error = action.payload as string;
            });

        // Reset todos when user logs out
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        });
    },
});

export const { clearError, resetTodos } = todoSlice.actions;
export default todoSlice.reducer;