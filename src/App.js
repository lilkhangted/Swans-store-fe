import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Context/authContext';
import MainBody from './Body/MainBody';
import ProductDetail from './Body/ProductDetail';
import Register from './Body/Register';
import Login from './Body/Login';
import AdminDashboard from './Admin/adminMain';

// Component bảo vệ route
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    // Nếu chưa đăng nhập, chuyển hướng về /login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Nếu role không khớp, chuyển hướng về /home
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<MainBody />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<MainBody />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;