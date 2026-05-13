import React, { useState } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false)
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              onClick={closeMenu}
            >
              Trang Chủ
            </NavLink>
            <NavLink to="/trang-suc" onClick={() => setIsMenuOpen(false)}>
              Sản Phẩm
            </NavLink>
            <NavLink to="/day-chuyen" onClick={() => setIsMenuOpen(false)}>
              Dây Chuyền
            </NavLink>
            <NavLink to="/nhan" onClick={() => setIsMenuOpen(false)}>
              Nhẫn
            </NavLink>
            <NavLink to="/bong-tai" onClick={() => setIsMenuOpen(false)}>
              Bông Tai
            </NavLink>
            <NavLink to="/vong-tay" onClick={() => setIsMenuOpen(false)}>
              Vòng Tay
            </NavLink>
            <NavLink to="/dong-ho" onClick={() => setIsMenuOpen(false)}>
              Đồng Hồ
            </NavLink>
            <NavLink to="/cap_doi" onClick={() => setIsMenuOpen(false)}>
              Cặp đôi
            </NavLink>
          </nav>

          <div className="sub-nav">
            <NavLink to="/bo-suu-tap" onClick={() => setIsMenuOpen(false)}>
              Bộ Sưu Tập
            </NavLink>
            <NavLink to="/uu-dai" onClick={() => setIsMenuOpen(false)}>
              Ưu Đãi
            </NavLink>
            <NavLink to="/blog" onClick={() => setIsMenuOpen(false)}>
              Blog
            </NavLink>
            <NavLink to="/lien-he" onClick={() => setIsMenuOpen(false)}>
              Liên Hệ
            </NavLink>
          </div>
        </div>

        <div className="header-icons-placeholder"></div>
      </div>

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
