import "../App.css";
import { Link } from "react-router-dom";
function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <p>&copy; 2025 SwanStores. All rights reserved.</p>
                <p>Contact to: lyankhang2004@gmail.com</p>
                <ul className="footer-links">
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="/about">Về chúng tôi</a></li>
                    <li><a href="/contact">Liên hệ</a></li>
                    <li><a href="/policy">Chính sách bảo mật</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Footer;