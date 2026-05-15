// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { NavLink, Link } from "react-router-dom";

import { FaCartShopping } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useFavorite } from "../../context/FavoriteContext";
import CartPage from "../../pages/CartPage/CartDropdown";
import FavoriteDropdown from "../../pages/FavoritePage/FavoriteDropdown";
import AuthPage from "../../pages/Auth/AuthPage";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoriteOpen, setIsFavoriteOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { cartItems } = useCart();
  const { favoriteCount } = useFavorite();

  const cartRef = useRef(null);
  const favoriteRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsCartOpen(false);
    setIsFavoriteOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const toggleCart = (e) => {
    e.preventDefault();
    setIsCartOpen(!isCartOpen);
    setIsFavoriteOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavoriteOpen(!isFavoriteOpen);
    setIsCartOpen(false);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Hàm mở Modal Login/Register
  const openAuthModal = () => {
    setIsAuthOpen(true);
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsFavoriteOpen(false);
  };

  const handleActionClick = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsFavoriteOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (favoriteRef.current && !favoriteRef.current.contains(event.target)) {
        setIsFavoriteOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <Link to="/" className="logo" onClick={handleActionClick}>
          <h1>Chichi</h1>
          <span>JEWELRY</span>
        </Link>

        <div className={`nav-wrapper ${isMenuOpen ? "open" : ""}`}>
          <nav className="main-nav">
            <NavLink to="/" onClick={closeMenu} end>
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
            {/* cart*/}
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

            {/* favorite*/}
            <div className="favorite-wrapper" ref={favoriteRef}>
              <div
                className={`favorite-trigger ${isFavoriteOpen ? "active" : ""}`}
                onClick={toggleFavorite}
              >
                <MdFavorite />
                {favoriteCount > 0 && (
                  <span className="favorite-count">{favoriteCount}</span>
                )}
              </div>
              {isFavoriteOpen && (
                <FavoriteDropdown setIsFavoriteOpen={setIsFavoriteOpen} />
              )}
            </div>

            {/* profile*/}
            <div className="profile-wrapper">
              <button className="profile-trigger" onClick={openAuthModal}>
                <FaUserAlt />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;
