import React, { createContext, useState,useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Initialize state based on localStorage
        const token = localStorage.getItem('jwtToken');
        return {
            token: token ? token : null,
            isAuthenticated: !!token, // Set to true if token exists
        };
    });
    useEffect(() => {
        const userProfile = localStorage.getItem('profile');
        // Only reset profile if it is null, empty, or not one of the valid roles
        const validRoles = ['User', 'Restaurant', 'Rider'];
        if (!userProfile || userProfile === 'null' || !validRoles.includes(userProfile)) {
            const defaultProfile = 'User';
            localStorage.setItem('profile', defaultProfile);
        }
    }, []);

    

    const logOut = () => {
        localStorage.removeItem("jwtToken");
        // Redirect to the login page or home page
        window.location.href = "/"; // Adjust the path as needed
    }

    const [notification, setNotification] = useState([]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, notification, setNotification,logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContext;
