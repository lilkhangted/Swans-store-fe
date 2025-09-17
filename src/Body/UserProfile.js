import {useEffect, useState} from 'react';
import "../App.css";
import {useAuth} from '../Context/authContext';
const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://swans-store-be.onrender.com";

function UserProfile({ userId, token, onClose }) {
    const { logout, user } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', img: '' });
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.userId) {
        try {
          const res = await fetch(`${API_URL}/api/users/${user.userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) {
            setFormData({
              name: data.name || '',
              email: data.email || '',
              phone: data.phone || '',
              img: data.img || ''
            });
          } else {
            console.error(data.message);
          }
        } catch (err) {
          console.error('Fetch user error:', err);
        }
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Cập nhật thành công!');
        onClose();
      } else {
        alert('Lỗi: ' + data.message);
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };


  return (
    <div className="modal-overlay">
    
      <div className="modal-box">
        <h2>Thông tin cá nhân</h2>
        <div className='user-content'>
            <div className='left-pf'>
                <img className='avatar' src={formData.img || '/client/public/downloaddd.png'} alt="Avatar" />
            </div>

            <div className='right-pf'>
                <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên"
                />
                <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                />
                <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                />
            </div>
        </div>
        <div className="modal-actions">
          <button onClick={logout} className='btn-logout'>Đăng xuất<table></table></button>
          <button onClick={onClose} className="btn-cancel">Đóng</button>
          <button onClick={handleSave} className="btn-save">Lưu</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;