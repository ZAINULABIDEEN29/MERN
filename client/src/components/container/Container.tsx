import React from "react";

interface ICHILDREN {
    children: React.ReactNode;
}

const Container: React.FC<ICHILDREN> = ({ children }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

export default Container;
