import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { IoTrashOutline, IoAddOutline, IoRemoveOutline, IoArrowBackOutline } from "react-icons/io5";
import "./CartFullPage.scss";

const CartFullPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  // Giả định phí vận chuyển
  const shippingFee = totalPrice > 2000000 ? 0 : 30000;

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="container">
          <div className="empty-content">
            <h1>Giỏ hàng của bạn đang trống</h1>
            <p>Hãy chọn cho mình những món trang sức tuyệt vời nhất từ Chichi Jewelry.</p>
            <Link to="/trang-suc" className="btn-gold">QUAY LẠI CỬA HÀNG</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-full-page">
      <div className="container">
        <div className="cart-breadcrumb">
          <Link to="/">Trang chủ</Link> <span>/</span> <strong>Giỏ hàng</strong>
        </div>

        <h1 className="page-title">Giỏ Hàng Của Bạn</h1>

        <div className="cart-layout">
          {/* BÊN TRÁI: DANH SÁCH SẢN PHẨM */}
          <div className="cart-main">
            <div className="cart-table-header">
              <span className="col-product">Sản phẩm</span>
              <span className="col-price">Giá tiền</span>
              <span className="col-qty">Số lượng</span>
              <span className="col-total">Tổng cộng</span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="col-product item-info">
                    <img src={item.thumbnail} alt={item.name} />
                    <div className="details">
                      <h3>{item.name}</h3>
                      <p>Chất liệu: {item.material}</p>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        <IoTrashOutline /> Xóa
                      </button>
                    </div>
                  </div>

                  <div className="col-price">
                    {parseFloat(item.price).toLocaleString("vi-VN")}đ
                  </div>

                  <div className="col-qty">
                    <div className="qty-control">
                      <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                        <IoRemoveOutline />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <IoAddOutline />
                      </button>
                    </div>
                  </div>

                  <div className="col-total">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </div>
                </div>
              ))}
            </div>

            <Link to="/trang-suc" className="back-link">
              <IoArrowBackOutline /> Tiếp tục mua sắm
            </Link>
          </div>

          {/* BÊN PHẢI: TỔNG KẾT ĐƠN HÀNG */}
          <aside className="cart-sidebar">
            <div className="summary-card">
              <h2>Tóm tắt đơn hàng</h2>
              
              <div className="summary-row">
                <span>Tạm tính</span>
                <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
              </div>
              
              <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span>{shippingFee === 0 ? "Miễn phí" : `${shippingFee.toLocaleString("vi-VN")}đ`}</span>
              </div>

              {shippingFee > 0 && (
                <p className="shipping-note">Miễn phí vận chuyển cho đơn hàng trên 2.000.000đ</p>
              )}

              <div className="summary-total">
                <span>Tổng tiền</span>
                <span className="total-amount">{(totalPrice + shippingFee).toLocaleString("vi-VN")}đ</span>
              </div>

              <button className="checkout-btn" onClick={() => navigate("/check-out")}>
                TIẾN HÀNH THANH TOÁN
              </button>

              <div className="payment-methods">
                <p>Chúng tôi chấp nhận:</p>
                <div className="icons">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="paypal" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="mastercard" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartFullPage;