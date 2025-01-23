import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the context
const AuthContext = createContext();

// Create a custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component that wraps your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expire, setExpire] = useState('')
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Login function
  const login = async (email, password) => {
    try {
        const response = await axios.post('api/users/sign_in', { user: { email, password } }, { withCredentials: true });
        console.log(response);
        setUser(response.data.user); // Ensure you're setting the correct user object
        setExpire(response.data.exp)
        setAuthenticated(true);
        navigate('/dashboard');
    } catch (e) {
        console.log(e);
        setAuthenticated(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
        const response = await axios.delete('api/users/sign_out', { withCredentials: true });
        console.log('Logout Response:', response);
        setUser(null);
        setAuthenticated(false);
        navigate('/');
    } catch (e) {
        console.log(e);
    }
  };

  // Check authentication status
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/api/current_user', { withCredentials: true });
      console.log(response);
      if (response.data.user) {
        setUser(response.data.user); // Set user data
        setAuthenticated(true); // User is authenticated
      }
    } catch (e) {
      console.log('Not authenticated');
      setUser(null);
      setAuthenticated(false); // User is not authenticated
    } finally {
      setLoading(false); // Set loading to false after check completes
    }
  };

  // Persist authentication on page reload (Optional)
  useEffect(() => {
    checkAuthStatus();
  }, []); // This runs only once on component mount

  // Provide the context value
  return (
    <AuthContext.Provider value={{ user, login, logout, checkAuthStatus, authenticated, loading, expire }}>
      {children}
    </AuthContext.Provider>
  );
};
