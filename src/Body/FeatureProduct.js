import React, { useEffect, useState }from "react";
import "../App.css";
import ScrollFade from "../Context/scrollFade";
import { Link } from "react-router-dom";


function FeatureProduct({ product }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef();
  const showFeature = ScrollFade(ref);
    useEffect(() => {
        if (showFeature) {
            setIsVisible(true);
        }
    }, [showFeature]);
    return (
        <div ref={ref} className={`featured-product ${isVisible ? "visible" : ""}`}>
            <img src={product.images} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <Link to={`/product/${product.id}`} className="details-button">
                View Details
            </Link>
        </div>
    );
}
export default FeatureProduct;