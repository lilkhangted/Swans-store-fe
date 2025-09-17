import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

import AdminDashboard from "./adminMain";
import AdminHome from "./AdminHome";
import AdminProd from "./AdProduct";
import AdminOrder from "./AdOrder";
import AdminPayment from "./AdPayment";
import AdminCategory from "./AdCategory";

const Admin = () => {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-container">
      <AdminDashboard />
      <div className="admin-content">
        <Routes>
          <Route path="home" element={<AdminHome />} />
          <Route path="products" element={<AdminProd />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="payment" element={<AdminPayment />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="" element={<Navigate to="home" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
