import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function HomePage() {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

const handlePrev = () => {
  setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
};

const handleNext = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex + itemsPerPage < visibleProducts.length
      ? prevIndex + 1
      : prevIndex
  );
};

useEffect(() => {
  fetch("https://swans-store-be.onrender.com/api/ping")
}, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://swans-store-be.onrender.com/api/products");
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setVisibleProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

    return (
        <div className="homepage">
        <h1 className='title-header'>Chào Mừng Đến Với SwanStores</h1>
        <Header />
    
          <section id="home" className="hero">
            <div className="hero-left">
            <h1>
            </h1>
              <p className="hero-text">
                Chào mừng bạn đến với cửa hàng phụ kiện Swans,
                nơi bạn có thể khám phá những sản phẩm độc đáo
                và thời thượng hình thiên nga.
              </p>
              <button className="explore-btn">Khám Phá</button>
            </div>
            <div className="hero-right">
              <img
                src="/swans.jpg"alt="Swan"
                className="hero-image"
              />
            </div>
          </section>
    
          <section className="banner">
            <h2>Khuyến Mãi Đặc Biệt</h2>
            <p>Nhận ngay ưu đãi hấp dẫn cho đơn hàng đầu tiên của bạn.</p>
            <button>Xem Ngay</button>
          </section>
    
          <section className='offer-section'>
            <div className='left-content'>
            <h2 className='offer-text'>Khám phá ngay</h2>
              <p>Nhận ngay ưu đãi hấp dẫn cho đơn hàng đầu tiên của bạn.</p>
              <button className='more'>Xem ngay</button>
            </div>
            <div className='right-content'><img className='ring-img' src="/swan-ring.jpg" alt="nhan" /></div>
          </section>

          
          <h2 className='title'>Sản Phẩm Nổi Bật</h2>
          <section className="featured-products">
              <div className="products">
                <button className="slider-btn left" onClick={handlePrev} disabled={currentIndex === 0}>&lt;</button>
                {visibleProducts.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
                  <div className="product" key={product.id}>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>Giá: {product.price.toLocaleString()}₫</p>
                    </Link>
                  </div>
              ))}
                <button className="slider-btn right" onClick={handleNext} disabled={currentIndex + itemsPerPage >= visibleProducts.length}>&gt;</button>
              </div>
          </section>
          <Footer />
        </div>
      );
}
export default HomePage;