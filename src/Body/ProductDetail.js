import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from '../Context/authContext';
import "./productDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const imageRef = useRef(null);
  const [zoomStyle, setZoomStyle] = useState({});
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL;
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) throw new Error("Không thể tải sản phẩm");
        const data = await res.json();
        setProduct(data);
        setMainImage(data.images?.[0] || "");
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

  const handleAddToCart = async () => {
    if (!color) {
      alert("Vui lòng chọn màu sắc");
      return;
    }
    if (!user) {
      alert("Vui lòng đăng nhập trước khi thêm vào giỏ hàng");
      return;
    }

    const API_URL = process.env.REACT_APP_API_URL;

    const cartItem = {
      userId: user.userId,
      productId: product.id,
      color,
      quantity
    };

    try {
      const res = await fetch(`${API_URL}/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(cartItem)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Đã thêm vào giỏ hàng!");
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Không thể thêm vào giỏ hàng.");
    }
  };


  const handleDecrease = () => setQuantity(Math.max(1, quantity - 1));
  const handleIncrease = () => setQuantity(quantity + 1);

  const handleColorChange = (e) => {
    const selected = e.target.value;
    setColor(selected);

    const variant = product?.variants?.find(v => v.color === selected);
    if (variant && variant.image) {
      setMainImage(variant.image);
    }
  };

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
              src={mainImage || product.varriants?.[0]?.image}
              alt={product.name}
              className="main-image"
              ref={imageRef}
              style={zoomStyle}
            />
          </div>
          <div className="thumbnails">
            {product.variants?.map((v, idx) => (
              <img
                key={idx}
                src={v.image}
                alt={v.color}
                className={`thumb ${color === v.color ? "active" : ""}`}
                onClick={() => {
                  setMainImage(v.image);
                  setColor(v.color);
                }}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-right">
          <h2>{product.name}</h2>
          <p className="price">{product.price.toLocaleString()}₫</p>
          <div className="select-group">
            <label>Màu Sắc *</label>
            <select value={color} onChange={handleColorChange}>
              <option value="">Chọn</option>
              {product.variants?.map((v, i) => (
                <option key={i} value={v.color}>
                  {v.color}
                </option>
              ))}
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

          <button className="add-to-cart" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>

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
