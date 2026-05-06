import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>LUMINA</h1>
          <span>JEWELRY</span>
        </div>
        <nav className="main-nav">
          <a href="/" className="active">Trang Chủ</a>
          <a href="/san-pham">Sản Phẩm</a>
          <a href="/day-chuyen">Dây Chuyền</a>
          <a href="/nhan">Nhẫn</a>
          <a href="/bong-tai">Bông Tai</a>
          <a href="/vong-tay">Vòng Tay</a>
          <a href="/dong-ho">Đồng Hồ</a>
        </nav>
        <div className="sub-nav">
          <a href="/bo-suu-tap">Bộ Sưu Tập</a>
          <a href="/uu-dai">Ưu Đãi</a>
          <a href="/blog">Blog</a>
          <a href="/lien-he">Liên Hệ</a>
        </div>
      </div>
    </header>
  );
};

export default Header;