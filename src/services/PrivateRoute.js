import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const PrivateRoute = ({ element }) => {
  const { user, error } = useAuth(); // Get auth state from context

  return user && error ==null ? element : <Navigate to="/" />;
};

export default PrivateRoute;
