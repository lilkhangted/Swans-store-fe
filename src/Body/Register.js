import React, { useState } from "react";
import "./RegLog.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useAuth } from "../Context/authContext";
import { Link } from "react-router-dom";

function Register() {
  const { register } = useAuth(); 
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    street: '',
    city: '',
    country: '',
    postalCode: '',
    dob: '',
    subscribe: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName) {
      setError("Vui lòng nhập Họ và Tên");
      return;
    }
    if (!form.email) {
      setError("Vui lòng nhập Email");
      return;
    }
    if (!form.password) {
      setError("Vui lòng nhập Mật khẩu");
      return;
    }
    if (!form.confirm) {
      setError("Vui lòng xác nhận lại mật khẩu");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }
    if (!form.phone) {
      setError("Vui lòng nhập Số điện thoại");
      return;
    }
    if (!form.street || !form.city || !form.country || !form.zip) {
      setError("Vui lòng nhập đầy đủ Địa chỉ (street, city, country, zip)");
      return;
    }
    if (!form.dob) {
      setError("Vui lòng chọn Ngày sinh");
      return;
    }
    if (!form.agree) {
      setError("Bạn phải đồng ý với chính sách bảo mật và điều khoản sử dụng");
      return;
    }
    const userData = {
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        country: form.country,
        postalCode: form.zip,
      },
      dob: form.dob,
      subscribe: form.subscribe,
    };

    try {
      await register(userData);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="register-page">
      <Header />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Đăng kí</h2>
        <input
          className="register-input"
          type="text"
          name="firstName"
          placeholder="First name *"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="text"
          name="lastName"
          placeholder="Last name *"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="text"
          name="street"
          placeholder="Street and street number *"
          value={form.street}
          onChange={handleChange}
        />
        
          <input
            className="register-input"
            type="text"
            name="zip"
            placeholder="Zip *"
            value={form.zip}
            onChange={handleChange}
          />
          <input
            className="register-input"
            type="text"
            name="city"
            placeholder="City/Town *"
            value={form.city}
            onChange={handleChange}
          />
        
        <select
          className="register-input"
          name="country"
          value={form.country}
          onChange={handleChange}
        >
          <option value="">Please select a country... *</option>
          <option value="Vietnam">Vietnam</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          {/* Thêm các quốc gia khác nếu muốn */}
        </select>
        <input
          className="register-input"
          type="date"
          name="dob"
          placeholder="Choose your date of birth"
          value={form.dob}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="number"
          name="phone"
          placeholder="Telephone *"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Set a password *"
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="register-input"
          type="password"
          name="confirm"
          placeholder="Confirm password *"
          value={form.confirm}
          onChange={handleChange}
        />
        <div className="register-note">
          7 characters min./Include a capital letter and a numerical digit
        </div>
        <div className="register-policy">
          By providing your personal information, you agree to our{" "}
          <a href="/policy" target="_blank" rel="noopener noreferrer">
            Privacy & Cookies Policy
          </a>
          .
        </div>
        <div className="register-checkbox">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            id="agree"
          />
          <label htmlFor="agree">
            Tôi đồng ý với chính sách bảo mật và điều khoản sử dụng.
          </label>
        </div>
        <div className="register-checkbox">
          <input
            type="checkbox"
            name="subscribe"
            checked={form.subscribe}
            onChange={handleChange}
            id="subscribe"
          />
          <label htmlFor="subscribe">
            Yes, I would like to subscribe to the newsletter and personalized communications.
          </label>
        </div>
        {error && <div className="login-error">{error}</div>}
        <button className="register-btn" type="submit">
          Register
        </button>
        <div className="register-footer">
          <Link to="/login">Login or use another Email</Link>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Register;