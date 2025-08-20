import "../App.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
function Header() {
//     const [cartCount, setCartCount] = useState(0);

//     useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
//     setCartCount(totalItems);
//   }, []);

//   if (cartCount === 0) return null;
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-left">
          <li>
            <Link to="/">
              <img className='logo' src="/logo.jpg" alt="logo" />
            </Link>
          </li>
        </ul>
        <ul className="nav-mid">
          <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/explore">Khám phá</Link></li>
            <li><Link to="/featured">Sản Phẩm Nổi Bật</Link></li>
            <li><Link to="/offer">Ưu Đãi</Link></li>
            <li><Link to="/news">Tin tức</Link></li>

        </ul>
        <ul className="nav-right">
          <li><Link to ="/login"><FaUser size={24}/> </Link></li>
          <li><Link to="/cart"><FaShoppingCart size={24}/></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;