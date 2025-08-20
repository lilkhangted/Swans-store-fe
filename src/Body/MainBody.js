import HomePage from "./HomePage";
import "../App.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function MainBody() {  
    return (
        <div className="main-body">
            <h1 className='title-header'>Chào Mừng Đến Với SwanStores</h1>
            <Header />
            <HomePage />
            <Footer />
        </div>
    );
}

export default MainBody;