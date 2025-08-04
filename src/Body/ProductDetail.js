import { useParams } from 'react-router-dom';
import products from '../product';
import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './productDetail.css';
import { useRef } from 'react';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef(null);
  const [zoomStyle, setZoomStyle] = useState({});


  if (!product) return <p>Không tìm thấy sản phẩm.</p>;


  const handleMouseMove = (e) => {
  const image = imageRef.current;
  const rect = image.getBoundingClientRect();

  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  setZoomStyle({
    transformOrigin: `${x}% ${y}%`,
    transform: 'scale(2)',
  });
};

const handleMouseLeave = () => {
  setZoomStyle({
    transform: 'scale(1)',
    transformOrigin: 'center center',
  });
};

  return (
    <div className="product-detail">
      <Header />
      <div className="product-detail-container">
        <div className="product-detail-left">
          <div 
            className="main-image-wrapper"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <img
              src={product.image}
              alt={product.name}
              className="main-image"
              ref={imageRef}
              style={zoomStyle}
            />
          </div>
          <div className="thumbnails">
            <img src={product.image} alt="thumb" className="thumb" />
          </div>
        </div>

        <div className="product-detail-right">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()}₫</p>

          <div className="select-group">
            <label>Kích Thước *</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Chọn</option>
              <option value="S">Nhỏ</option>
              <option value="M">Trung</option>
              <option value="L">Lớn</option>
            </select>
          </div>

          <div className="select-group">
            <label>Màu Sắc *</label>
            <select value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">Chọn</option>
              <option value="gold">Vàng</option>
              <option value="silver">Bạc</option>
              <option value="pink">Hồng</option>
            </select>
          </div>

          <div className="quantity-group">
            <label>Số lượng *</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button className="add-to-cart">Thêm vào giỏ hàng</button>

          <div className="share-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-pinterest"></i>
            <i className="fab fa-whatsapp"></i>
            <i className="fas fa-times"></i>
          </div>
        </div>

        <div className="product-description">
          <p>{product.description}</p>
        </div>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default ProductDetail;
