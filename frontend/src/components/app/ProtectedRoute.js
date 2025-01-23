import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { authenticated, user, checkAuthStatus, expire } = useAuth();

    useEffect(() => {
        // Check the authentication status once when the component mounts
        checkAuthStatus();

        // Log the expiration time (exp)
        console.log('User expiration time:', new Date(expire));
    }, [children]); // This will run whenever the user changes

    // If not authenticated, redirect to the home page
    if (!authenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
