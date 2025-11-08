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
       
        if (!isAuthenticated && !isLoading && !hasCheckedAuth.current) {
            hasCheckedAuth.current = true;
            dispatch(fetchUserProfile());
        }
    }, [dispatch, isAuthenticated, isLoading]);

    
    if (isAuthenticated && user) {
        return <>{children}</>;
    }

   
    if (isLoading && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-xl text-gray-700">Loading...</div>
            </div>
        );
    }

   
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/login" replace />;
    }

    
    return null;
};

export default ProtectedRoute;

