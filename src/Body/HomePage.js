import React, {useRef} from "react";
import "../App.css";
import useScrollFadeIn from "../Context/scrollFade";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import Review from "./Review";
import FeatureProduct from "./FeatureProduct";

function HomePage() {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const reviewRef = useRef(null);
  const showReview = useScrollFadeIn(reviewRef);

  const baseURL = window.location.hostname === "localhost" ? "http://localhost:5000" : "https://swans-store-be.onrender.com";

  
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
    fetch(`${baseURL}/api/ping`);
  }, [baseURL]);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${baseURL}/api/products`);
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
    }, [baseURL]);
    if (loading) return <Loading />;
    if (error) return <p>Error: {error}</p>;

      return (
          <div className="homepage">
            <section id="home" className="hero">
              <div className="hero-left">
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
                <img className='ring-img' src="/swan-ring.jpg" alt="nhan" />
              </div>
              <div className='right-content'><h2 className='offer-text'>Khám phá ngay</h2>
                <p>Nhận ngay ưu đãi hấp dẫn cho đơn hàng đầu tiên của bạn.</p>
                <button className='more'>Xem ngay</button></div>
            </section>

            
            <h2 className='title'>Sản Phẩm Nổi Bật</h2>
            <div className="feature-products-container">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="nav-button">
                &#8592;
              </button>
              <div className="feature-products">
                {visibleProducts.slice(currentIndex, currentIndex + itemsPerPage).map((products) => (
                  <FeatureProduct key={products.id} product={products} />
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex + itemsPerPage >= visibleProducts.length}
                className="nav-button"
              >
                &#8594;
              </button>
            </div>
            <section ref={reviewRef} className={"review-section"} {...showReview}>
              <Review />
            </section>
          </div>
        );
}
export default HomePage;