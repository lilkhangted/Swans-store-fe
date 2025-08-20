import React, { useState } from "react";
import "./RegLog.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useAuth();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError(""); // Reset lỗi trước khi thử lại
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <Header />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Đăng nhập hoặc tạo tài khoản mới</h2>
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi */}
        <button className="register-btn" type="submit">
          Login
        </button>
        <div className="register-footer">
          <span>Chưa có tài khoản? </span>
          <Link to="/register">Đăng ký</Link>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login;