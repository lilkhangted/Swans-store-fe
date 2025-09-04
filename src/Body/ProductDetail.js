import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./productDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const imageRef = useRef(null);
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || "https://swans-store-be.onrender.com";
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Không thể tải sản phẩm");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleMouseMove = (e) => {
    const image = imageRef.current;
    if (!image) return;
    const rect = image.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center center",
    });
  };

  const handleDecrease = () => setQuantity(Math.max(1, quantity - 1));
  const handleIncrease = () => setQuantity(quantity + 1);

  if (loading) {
    return (
      <div className="product-detail">
        <Header />
        <p>Đang tải sản phẩm...</p>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail">
        <Header />
        <div className="not-found">
          <h2>Không tìm thấy sản phẩm.</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Header />

      <div className="product-detail-container">
        <div className="product-detail-left">
          <div
            className="main-image-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="main-image"
              ref={imageRef}
              style={zoomStyle}
            />
          </div>
          <div className="thumbnails">
            {product.images?.map((img, idx) => (
              <img key={idx} src={img} alt="thumb" className="thumb" />
            ))}
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
              <button onClick={handleDecrease}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={handleIncrease}>+</button>
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
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;
