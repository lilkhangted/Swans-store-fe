import "../App.css";
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
        <ul>
          <li>
            <Link to="/">
              <img className='logo' src="/logo.jpg" alt="logo" />
            </Link>
          </li>
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/explore">Khám phá</Link></li>
          <li><Link to="/featured">Sản Phẩm Nổi Bật</Link></li>
          <li><Link to="/store">Cửa Hàng</Link></li>
          <li className="cart-icon"><Link to="/cart"></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;