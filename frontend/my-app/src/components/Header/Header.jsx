import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import CartPage from "../../pages/CartPage/CartPage";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems } = useCart();

  const cartRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
  };

  const handleActionClick = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <NavLink to="/trang-suc" onClick={closeMenu}>
              Sản Phẩm
            </NavLink>
            <NavLink to="/day-chuyen" onClick={closeMenu}>
              Dây Chuyền
            </NavLink>
            <NavLink to="/nhan" onClick={closeMenu}>
              Nhẫn
            </NavLink>
            <NavLink to="/bong-tai" onClick={closeMenu}>
              Bông Tai
            </NavLink>
            <NavLink to="/vong-tay" onClick={closeMenu}>
              Vòng Tay
            </NavLink>
            <NavLink to="/cap_doi" onClick={closeMenu}>
              Cặp đôi
            </NavLink>
          </nav>

          <div className="sub-nav">
            <NavLink to="/bo-suu-tap" onClick={closeMenu}>
              Bộ Sưu Tập
            </NavLink>
            <NavLink to="/uu-dai" onClick={closeMenu}>
              Ưu Đãi
            </NavLink>
            <NavLink to="/blog" onClick={closeMenu}>
              Blog
            </NavLink>
            <NavLink to="/lien-he" onClick={closeMenu}>
              Liên Hệ
            </NavLink>
          </div>

          <div className="action-nav">
            <div className="cart-wrapper" ref={cartRef}>
              <div
                className={`cart-trigger ${isCartOpen ? "active" : ""}`}
                onClick={toggleCart}
              >
                <FaCartShopping />
                {cartItems.length > 0 && (
                  <span className="cart-count">{cartItems.length}</span>
                )}
              </div>

              {isCartOpen && <CartPage setIsCartOpen={setIsCartOpen} />}
            </div>

            <NavLink to="/favorites" onClick={handleActionClick}>
              <MdFavorite />
            </NavLink>

            <NavLink to="/profile" onClick={handleActionClick}>
              <FaUserAlt />
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
