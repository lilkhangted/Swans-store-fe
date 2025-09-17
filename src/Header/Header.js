import "../App.css";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import UserProfile from '../Body/UserProfile';

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://swans-store-be.onrender.com";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.userId) {
        try {
          const response = await fetch(`${API_URL}/api/users/${user.userId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
          });
          const data = await response.json();
          if (response.ok) {
            setUserInfo(data);  
          } else {
            console.error(data.message);
          }
        } catch (err) {
          console.error('Fetch user error:', err);
        }
      }
    };
    fetchUser();
  }, [user]);

  const cartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-left">
          <li>
            <Link to="/home">
              <img className='logo' src="/logo.jpg" alt="logo" />
            </Link>
          </li>
        </ul>
        <ul className="nav-mid">
          <li><Link to="/explore">Khám phá</Link></li>
          <li><Link to="/featured">Sản Phẩm Nổi Bật</Link></li>
          <li><Link to="/offer">Ưu Đãi</Link></li>
          <li><Link to="/news">Tin tức</Link></li>
        </ul>
        <ul className="nav-right">
          <li>
            {user && userInfo ? (
              <img
                src={userInfo.img || "https://i.pravatar.cc/40?default"}
                alt="avatar"
                className="user-avatar"
                onClick={() => setShowProfile(true)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
              />
            ) : (
              <Link to="/login">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  alt="login"
                  style={{ width: '24px', height: '24px' }}
                />
              </Link>
            )}
          </li>

          <li>
            <Link to="/cart" onClick={cartClick}>
              <FaShoppingCart size={24}/>
            </Link>
          </li>
        </ul>
      </nav>

      {showProfile && (
        <UserProfile
          userId={user.userId}
          token={user.token}
          onClose={() => setShowProfile(false)}
        />
      )}
    </header>
  );
}

export default Header;
