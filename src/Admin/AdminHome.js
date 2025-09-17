import React ,{useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import "./Admin.css";
import { Link } from "react-router-dom";
import {useAuth} from "../Context/authContext"; ;


const AdminHome = () => {
    const [ admin, setAdmin ] = useState(null);
    const { user } = useAuth();
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
        <div className="admin-home">
            <h2>Home Page</h2>
            <h3>Welcome {admin?.id}</h3>
        </div>
    );
};

export default AdminHome;