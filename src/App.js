import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/authContext';
import MainBody from './Body/MainBody';
import ProductDetail from './Body/ProductDetail';
import Register from './Body/Register';
import Login from './Body/Login';
import AdminDashboard from './Admin/adminMain';
import UserProfile from './Body/UserProfile';
import ProtectedRoute from './Context/ProtectedRoute';
import CartPage from './Body/CartPage';

function App() {

  return (
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<MainBody />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          } 
        />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;