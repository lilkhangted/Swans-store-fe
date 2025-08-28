import HomePage from "./HomePage";
import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loading from "../Loading";

function MainBody() {  
    const [loading, setLoading] = useState(false);
    return (
        <div className="main-body">
            <h1 className='title-header'>Chào Mừng Đến Với SwanStores</h1>
            <Header />
            {loading&& <Loading />}
            <HomePage />
            <Footer />
        </div>
    );
}

export default MainBody;