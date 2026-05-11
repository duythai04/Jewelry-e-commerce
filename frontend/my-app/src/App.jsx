import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from 'aos';

import 'aos/dist/aos.css';
import './App.css'; 

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"; 
import ScrollToTopOnLinkChange from "./components/ScrollToTop/ScrollToTop"; 

import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });
  }, []);

  return (
    <Router>
      <ScrollToTopOnLinkChange />
      
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trang-suc" element={<CategoryPage />} />
          
        </Routes>
      </main>

      <Footer/>
    </Router>
  );
};

export default App;