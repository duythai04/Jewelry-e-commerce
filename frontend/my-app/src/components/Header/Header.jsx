import React, { useState } from "react";
import "./Header.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Hamburger Icon cho Mobile */}
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="logo">
          <h1>Chichi</h1>
          <span>JEWELRY</span>
        </div>

        {/* Wrapper chứa cả 2 nav để dễ điều khiển trên mobile */}
        <div className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
          <nav className="main-nav">
            <a href="/" className="active" onClick={() => setIsMenuOpen(false)}>
              Trang Chủ
            </a>
            <a href="/trang_suc" onClick={() => setIsMenuOpen(false)}>
              Sản Phẩm
            </a>
            <a href="/day-chuyen" onClick={() => setIsMenuOpen(false)}>
              Dây Chuyền
            </a>
            <a href="/nhan" onClick={() => setIsMenuOpen(false)}>
              Nhẫn
            </a>
            <a href="/bong-tai" onClick={() => setIsMenuOpen(false)}>
              Bông Tai
            </a>
            <a href="/vong-tay" onClick={() => setIsMenuOpen(false)}>
              Vòng Tay
            </a>
            <a href="/dong-ho" onClick={() => setIsMenuOpen(false)}>
              Đồng Hồ
            </a>
            <a href="/cap_doi" onClick={() => setIsMenuOpen(false)}>
              Cặp đôi
            </a>
          </nav>

          <div className="sub-nav">
            <a href="/bo-suu-tap" onClick={() => setIsMenuOpen(false)}>
              Bộ Sưu Tập
            </a>
            <a href="/uu-dai" onClick={() => setIsMenuOpen(false)}>
              Ưu Đãi
            </a>
            <a href="/blog" onClick={() => setIsMenuOpen(false)}>
              Blog
            </a>
            <a href="/lien-he" onClick={() => setIsMenuOpen(false)}>
              Liên Hệ
            </a>
          </div>
        </div>

        <div className="header-icons-placeholder"></div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
