import api from "./api";
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from "../types/types";

export const authService = {
    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(
            "/api/users/create",
            credentials
        );
        return response.data;
    },

    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(
            "/api/users/login",
            credentials
        );
        return response.data;
    },

    getProfile: async (): Promise<AuthResponse> => {
        const response = await api.get<AuthResponse>("/api/users/profile");
        return response.data;
    },

    logout: async (): Promise<{ message: string }> => {
        const response = await api.get<{ message: string }>("/api/users/logout");
        return response.data;
    },
};

