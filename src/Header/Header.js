import "../App.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  const cartClick = () => {
    if (isLoggedIn) {
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
          <li><Link to ="/login"><FaUser size={24}/> </Link></li>
          <li><Link to="/cart" onClick={cartClick}><FaShoppingCart size={24}/></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;