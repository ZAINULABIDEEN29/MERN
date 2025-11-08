import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import {
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    clearError,
} from "../features/todo/todoSlice";
import type { CreateTodoData, UpdateTodoData } from "../types/types";

export const useTodos = () => {
    const dispatch = useAppDispatch();
    const { items: todos, loading: isLoading, error } = useAppSelector(
        (state) => state.todos
    );
    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const hasFetchedRef = useRef(false);
    const userIdRef = useRef<string | null>(null);

    
    useEffect(() => {
        const userId = user?._id;
        
        
        if (isAuthenticated && user && userId) {
            const userChanged = userIdRef.current !== userId;
            if (!hasFetchedRef.current || userChanged) {
                hasFetchedRef.current = true;
                userIdRef.current = userId;
                dispatch(fetchTodos());
            }
        } else if (!isAuthenticated || !user) {
            
            hasFetchedRef.current = false;
            userIdRef.current = null;
        }
    }, [dispatch, isAuthenticated, user?._id]);

    const createTodo = async (
        data: CreateTodoData,
        options?: { onSuccess?: () => void; onError?: (error: any) => void }
    ) => {
        try {
            await dispatch(addTodo(data)).unwrap();
          
            dispatch(fetchTodos());
            if (options?.onSuccess) {
                options.onSuccess();
            }
        } catch (error: any) {
            if (options?.onError) {
                options.onError(error);
            }
            throw error;
        }
    };

    const updateTodoItem = async (
        id: string,
        data: UpdateTodoData,
        options?: { onSuccess?: () => void; onError?: (error: any) => void }
    ) => {
        try {
            await dispatch(updateTodo({ id, data })).unwrap();
           
            if (options?.onSuccess) {
                options.onSuccess();
            }
        } catch (error: any) {
            
            dispatch(fetchTodos());
            if (options?.onError) {
                options.onError(error);
            }
            throw error;
        }
    };

    const deleteTodoItem = async (
        id: string,
        options?: { onSuccess?: () => void; onError?: (error: any) => void }
    ) => {
        try {
            await dispatch(deleteTodo(id)).unwrap();
          
            if (options?.onSuccess) {
                options.onSuccess();
            }
        } catch (error: any) {
            
            dispatch(fetchTodos());
            if (options?.onError) {
                options.onError(error);
            }
            throw error;
        }
    };

    return {
        todos,
        isLoading,
        error,
        refetch: () => dispatch(fetchTodos()),
        createTodo,
        updateTodo: updateTodoItem,
        deleteTodo: deleteTodoItem,
        clearError: () => dispatch(clearError()),
        isCreating: false, 
        isUpdating: false,
        isDeleting: false,
        createError: error,
        updateError: error,
        deleteError: error,
    };
};

