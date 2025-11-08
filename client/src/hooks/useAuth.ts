import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux";
import {
    loginUser,
    registerUser,
    logoutUser,
    clearError,
} from "../features/auth/authSlice";
import type { LoginCredentials, RegisterCredentials } from "../types/types";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, isLoading, error } = useAppSelector(
        (state) => state.auth
    );

    const login = async (
        credentials: LoginCredentials,
        options?: { onError?: (error: any) => void }
    ) => {
        try {
            const result = await dispatch(loginUser(credentials)).unwrap();
            
            return result;
        } catch (error: any) {
            if (options?.onError) {
                options.onError(error);
            }
            throw error;
        }
    };

    const register = async (
        credentials: RegisterCredentials,
        options?: { onError?: (error: any) => void }
    ) => {
        try {
            const result = await dispatch(registerUser(credentials)).unwrap();
           
            return result;
        } catch (error: any) {
            if (options?.onError) {
                options.onError(error);
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return {
        user,
        isAuthenticated,
        isLoadingUser: isLoading,
        userError: error,
        login,
        register,
        logout,
        clearError: () => dispatch(clearError()),
        isRegistering: false, 
        isLoggingIn: false,
        isLoggingOut: false,
        registerError: error,
        loginError: error,
    };
};

