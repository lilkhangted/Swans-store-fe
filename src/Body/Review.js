import React from "react";
import "../App.css";
import useScrollFadeIn from "../Context/scrollFade";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/authContext";
import Loading from "../Loading";

function Review()
{
    const ref = useRef();
    const isVisible = useScrollFadeIn(ref);
    return(
        <div
      ref={ref}
      className={`review-container fade-section ${isVisible ? "visible" : ""}`}
    >
            <h2>Customer Reviews</h2>
            <div className="review1">
                 <img src="/user1.jpg" alt="user" />
                <p className="review-text">"Sản phẩm rất đẹp và chất lượng tốt. Mình rất hài lòng với dịch vụ của Swans Store!"</p>
                <p className="review-author">- Huge JackMan</p>
                
            </div>
            <div className="review2">
                <img src="/user2.jpg" alt="user" />
                <p className="review-text">"Giao hàng nhanh chóng và đóng gói cẩn thận. Sẽ tiếp tục ủng hộ Swans Store!"</p>
                <p className="review-author">- Stacy Cooper</p>
            </div>
            <div className="review3">
                <img src="/user3.jpg" alt="user" />
                <p className="review-text">"Mình đã mua nhiều lần ở đây và chưa bao giờ thất vọng. Sản phẩm luôn đúng như mô tả."</p>
                <p className="review-author">- Kim Lee</p>
            </div>
        </div>
        
    )
    
}

export default Review;