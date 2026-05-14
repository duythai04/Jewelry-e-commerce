import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import {
  IoCloseOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoBagHandleOutline,
} from "react-icons/io5";
import "./CartPage.scss";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="cart-dropdown">
      <div className="cart-header">
        <div className="header-title">
          <IoBagHandleOutline className="icon" />
          <span>Giỏ Hàng ({cartItems.length})</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <IoBagHandleOutline className="empty-icon" />
          <p>Giỏ hàng của bạn đang trống</p>
          <button className="continue-shopping">TIẾP TỤC MUA SẮM</button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.thumbnail} alt={item.name} />
                </div>

                <div className="item-details">
                  <div className="item-name-row">
                    <h3>{item.name}</h3>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      title="Xóa sản phẩm"
                    >
                      <IoCloseOutline />
                    </button>
                  </div>

                  <p className="material">{item.material}</p>

                  <div className="item-bottom-row">
                    <div className="quantity-box">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                      >
                        <IoRemoveOutline />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <IoAddOutline />
                      </button>
                    </div>

                    <div className="item-price">
                      {parseFloat(item.price * item.quantity).toLocaleString(
                        "vi-VN",
                      )}
                      đ
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="total-row">
              <span className="label">Tổng cộng:</span>
              <span className="amount">
                {totalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <p className="tax-note">
              Thuế và phí vận chuyển tính khi thanh toán
            </p>
            <button className="checkout-btn">THANH TOÁN NGAY</button>
            <Link to="/cart-full" className="view-cart-link">
              Xem chi tiết giỏ hàng
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
