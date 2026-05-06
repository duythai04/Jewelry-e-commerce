import React from 'react';
import './Footer.scss';

// Inline SVG Icons để tránh lỗi import thư viện
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.42-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
);

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Cột 1: Thông tin thương hiệu */}
        <div className="footer-col brand-info">
          <h2 className="footer-logo">LUMINA LUXURY</h2>
          <p className="brand-desc">
            Đánh thức vẻ đẹp vĩnh cửu thông qua những kiệt tác trang sức được chế tác thủ công tinh xảo nhất.
          </p>
          <div className="social-links">
            <a href="#"><FacebookIcon /></a>
            <a href="#"><InstagramIcon /></a>
            <a href="#"><YoutubeIcon /></a>
          </div>
        </div>

        {/* Cột 2: Mua sắm */}
        <div className="footer-col">
          <h4 className="col-title">MUA SẮM</h4>
          <ul className="footer-links">
            <li><a href="#">Nhẫn Kim Cương</a></li>
            <li><a href="#">Dây Chuyền Aura</a></li>
            <li><a href="#">Bông Tai Sapphire</a></li>
            <li><a href="#">Vòng Tay Moonlight</a></li>
            <li><a href="#">Bộ Sưu Tập Mới</a></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ khách hàng */}
        <div className="footer-col">
          <h4 className="col-title">HỖ TRỢ</h4>
          <ul className="footer-links">
            <li><a href="#">Chính Sách Bảo Hành</a></li>
            <li><a href="#">Hướng Dẫn Đo Size</a></li>
            <li><a href="#">Vận Chuyển & Đổi Trả</a></li>
            <li><a href="#">Kiểm Định Kim Cương</a></li>
            <li><a href="#">Câu Hỏi Thường Gặp</a></li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ Showroom */}
        <div className="footer-col contact-info">
          <h4 className="col-title">SHOWROOM</h4>
          <p>Tòa nhà Lumina, 123 Đường Lê Lợi, <br /> Quận 1, TP. Hồ Chí Minh</p>
          <p className="phone">Hotline: 1900 8888</p>
          <p className="email">Email: contact@lumina.vn</p>
          <p className="hours">Mở cửa: 09:00 - 21:00 (Hàng ngày)</p>
        </div>

      </div>

      {/* Dòng bản quyền dưới cùng */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p>&copy; 2026 Lumina Luxury Jewelry. All rights reserved.</p>
          <div className="payment-methods">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;