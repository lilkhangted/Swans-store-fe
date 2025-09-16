import React, {useEffect, useState} from 'react';
import { useAuth } from '../Context/authContext';
import "./Admin.css";


const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [ admin, setAdmin ] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL
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
          <a href="/homeasd" className="menu-item">Home</a>
          <a href="/products" className="menu-item">Products</a>
          <a href="/orders" className="menu-item">Orders</a>
          <a href="/payment" className="menu-item active">Payment</a>
          <a href="/report" className="menu-item">Report</a>
          <a href="/categories" className="menu-item">Categories</a>
        </nav>

        <button onClick={logout} className="logout">Logout</button>
      </aside>
    </div>
  );
};

export default AdminDashboard;
