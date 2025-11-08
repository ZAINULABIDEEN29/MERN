import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserProfile } from "../features/auth/authSlice";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);
    const hasCheckedAuth = useRef(false);

    useEffect(() => {
        // Only fetch profile once on mount if not authenticated and not loading
        // This handles page refresh scenarios where we need to verify the token
        if (!isAuthenticated && !isLoading && !hasCheckedAuth.current) {
            hasCheckedAuth.current = true;
            dispatch(fetchUserProfile());
        }
    }, [dispatch, isAuthenticated, isLoading]);

    // If authenticated with user data, show children immediately
    if (isAuthenticated && user) {
        return <>{children}</>;
    }

    // Show loading only when actively fetching profile (on page refresh)
    if (isLoading && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-xl text-gray-700">Loading...</div>
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/login" replace />;
    }

    // Default: show nothing while determining auth state
    return null;
};

export default ProtectedRoute;

