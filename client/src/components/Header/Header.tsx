import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
    const { user, logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-indigo-600">
                            Todo App
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user && (
                            <span className="text-gray-700 font-medium">
                                {user.username}
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
