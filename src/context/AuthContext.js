// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect  } from 'react';
import { login, signup, checkUsernameAvailability, uploadProfilePic } from '../api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user object
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); // Restore user info from localStorage
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await login(username, password);
      const { token, user } = response;
      const userType = user?.user_type ?? user?.userType;

      // if(userType=='seller'){
      //   navigate('/seller/dashboard');
      // }
      // Assuming response contains both token and user details
  
      // Store token and user info in localStorage or sessionStorage
      localStorage.setItem('authToken', token); // Store token
      localStorage.setItem('user', JSON.stringify(user)); // Store user info (convert to string)
  
      // Optional: Use sessionStorage instead if you want data to be cleared when the page session ends
      // sessionStorage.setItem('authToken', token);
      // sessionStorage.setItem('user', JSON.stringify(user));
  
      setUser(user); // Store user info in context
      setError(null); // Clear any previous error messages
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed'); // Set error message for UI
    }
  };
  
  
  

  const handleSignup = async (username, password, email, dob, profilePic, userType, mobileNumber) => {
    try {
      const response = await signup(username, password, email, dob, profilePic, userType, mobileNumber);
      setUser(response.data); // Assuming response.data contains user info
      setError(null);
    } catch (err) {
      setError('Signup failed');
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await checkUsernameAvailability(username);
      return response.data; // Assuming response.data is a boolean indicating availability
    } catch (err) {
      setError('Error checking username availability');
      return false;
    }
  };

  const handleProfilePicUpload = async (username, file) => {
    try {
      const response = await uploadProfilePic(username, file);
      if (response.status === 200) {
        setUser({ ...user, profilePic: response.data.url }); // Update user profile picture
      }
    } catch (err) {
      setError('Error uploading profile picture');
    }
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user') // Remove token from localStorage
    setUser(null);
    navigate('/'); // Clear user on logout
  };
  
  return (
    <AuthContext.Provider value={{ user, error,setUser, handleLogin, handleSignup, checkUsername, handleProfilePicUpload, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
