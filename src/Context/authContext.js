import React, { createContext, useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser({ token: data.token, role: data.role });
        localStorage.setItem('token', data.token);
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (response.ok) {
      setUser({ token: data.token, role: data.role });
      localStorage.setItem('token', data.token);

      // Điều hướng dựa theo role
      if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
    console.error('Register error:', err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);