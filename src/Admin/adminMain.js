import React, {useEffect, useState} from 'react';
import { useAuth } from '../Context/authContext';
import { Link, Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminProd from './AdProduct';
import AdminOrder from './AdOrder';
import AdminPayment from './AdPayment';
import AdminCategory from './AdCategory';
import "./Admin.css";


const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [ admin, setAdmin ] = useState(null);
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://swans-store-be.onrender.com";
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/${user.userId}`, { 
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json(); 
        if (res.ok) {
          setAdmin(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Lỗi kết nối', err);
      }
    };
    if(user?.userId) fetchAdmin();
  }, [user]);


  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="profile">
          <img
            src={admin?.img}
            alt="Admin Avatar"
            className="avatar"
          />
          <h3>{admin?.email}</h3>
          <p className="role">{admin?.role}</p>
        </div>

        <nav className="menu">
          <Link to="/admin/home" className="menu-item">Home</Link>
          <Link to="/admin/products" className="menu-item">Products</Link>
          <Link to="/admin/orders" className="menu-item">Orders</Link>
          <Link to="/admin/payment" className="menu-item">Payment</Link>
          <Link to="/admin/categories" className="menu-item">Categories</Link>
        </nav>

        <button onClick={logout} className="logout">Logout</button>
      </aside>
    </div>
  );
};

export default AdminDashboard;
