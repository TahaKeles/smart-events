import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check for token in localStorage
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute; 