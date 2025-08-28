import React from 'react';
import { useAuth } from '../Context/authContext'; // import hook auth

const AdminDashboard = () => {
  const { logout, user } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Admin Dashboard</h1>
      {user && <p>Role: {user.role}</p>}
      <button 
        onClick={logout} 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
      

    </div>
  );
};

export default AdminDashboard;
