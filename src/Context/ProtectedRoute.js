import React from "react";
import { Navigate } from "react-router-dom";
import {useAuth} from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (user === null) {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/" />;
    }
  }

  return children;
}
export default ProtectedRoute;