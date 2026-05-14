import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { IoChevronBackOutline } from "react-icons/io5";
import "./CheckOutPage.scss";

const CheckoutPage = () => {
  const { cartItems, totalPrice } = useCart();

  const shippingFee = totalPrice > 2000000 ? 0 : 30000;

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-layout">
          <div className="checkout-main">
            <header className="checkout-header">
              <h1 className="brand-logo">CHICHI JEWELRY</h1>
              <nav className="breadcrumb">
                <Link to="/cart-full">Giỏ hàng</Link> <span>/</span>{" "}
                <strong>Thông tin thanh toán</strong>
              </nav>
            </header>
            {/*biểu mẫu */}
            <div className="form-content">
              <section className="form-section">
                <div className="section-header">
                  <h3>Thông tin giao hàng</h3>
                  <p>
                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                  </p>
                </div>

                <div className="form-grid">
                  <div className="input-group full">
                    <input type="text" placeholder="Họ và tên" required />
                  </div>
                  <div className="input-group half">
                    <input type="email" placeholder="Email" required />
                  </div>
                  <div className="input-group half">
                    <input type="tel" placeholder="Số điện thoại" required />
                  </div>
                  <div className="input-group full">
                    <input
                      type="text"
                      placeholder="Địa chỉ chi tiết (Số nhà, tên đường...)"
                      required
                    />
                  </div>
                  <div className="input-group third">
                    <select>
                      <option>Tỉnh / Thành</option>
                    </select>
                  </div>
                  <div className="input-group third">
                    <select>
                      <option>Quận / Huyện</option>
                    </select>
                  </div>
                  <div className="input-group third">
                    <select>
                      <option>Phường / Xã</option>
                    </select>
                  </div>
                  <div className="input-group full">
                    <textarea
                      placeholder="Ghi chú thêm (ví dụ: Giao giờ hành chính)"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h3>Phương thức thanh toán</h3>
                <div className="payment-options">
                  <label className="payment-item">
                    <input type="radio" name="payment" defaultChecked />
                    <div className="payment-info">
                      <span className="name">
                        Thanh toán khi nhận hàng (COD)
                      </span>
                      <p>Giao hàng và thu tiền tại nhà</p>
                    </div>
                  </label>

                  <label className="payment-item">
                    <input type="radio" name="payment" />
                    <div className="payment-info">
                      <span className="name">Chuyển khoản ngân hàng</span>
                      <p>Chuyển khoản qua QR Code hoặc số tài khoản</p>
                    </div>
                  </label>

                  <label className="payment-item">
                    <input type="radio" name="payment" />
                    <div className="payment-info">
                      <span className="name">Ví điện tử MoMo / ZaloPay</span>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            <footer className="checkout-footer">
              <Link to="/cart-full" className="back-link">
                <IoChevronBackOutline /> Quay lại giỏ hàng
              </Link>
              <button className="complete-btn">HOÀN TẤT ĐẶT HÀNG</button>
            </footer>
          </div>

          {/* tóm tắt đơn hàng */}
          <aside className="checkout-sidebar">
            <div className="order-summary">
              <div className="product-list">
                {cartItems.map((item) => (
                  <div className="product-item" key={item.id}>
                    <div className="img-wrapper">
                      <img src={item.thumbnail} alt={item.name} />
                      <span className="quantity-badge">{item.quantity}</span>
                    </div>
                    <div className="info">
                      <span className="name">{item.name}</span>
                      <span className="material">{item.material}</span>
                    </div>
                    <div className="price">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </div>
                  </div>
                ))}
              </div>

              <div className="discount-code">
                <input type="text" placeholder="Mã giảm giá" />
                <button disabled>Áp dụng</button>
              </div>

              <div className="price-lines">
                <div className="line">
                  <span>Tạm tính</span>
                  <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="line">
                  <span>Phí vận chuyển</span>
                  <span>
                    {shippingFee === 0
                      ? "Miễn phí"
                      : `${shippingFee.toLocaleString("vi-VN")}đ`}
                  </span>
                </div>
              </div>

              <div className="total-line">
                <span>Tổng cộng</span>
                <div className="final-price">
                  <small>VND</small>
                  <h3>{(totalPrice + shippingFee).toLocaleString("vi-VN")}đ</h3>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
