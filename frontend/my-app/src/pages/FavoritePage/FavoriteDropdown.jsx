import React from "react";
import { useFavorite } from "../../context/FavoriteContext";
import { useCart } from "../../context/CartContext";
import { Link, NavLink } from "react-router-dom";
import {
  IoHeartOutline,
  IoCartOutline,
  IoTrashOutline,
  IoCloseOutline,
} from "react-icons/io5";
import "./FavoriteDropdown.scss";

const FavoriteDropdown = ({ setIsFavoriteOpen }) => {
  const { favoriteItems, removeFromFavorite } = useFavorite();
  const { addToCart } = useCart();

  const handleClose = () => {
    if (setIsFavoriteOpen) setIsFavoriteOpen(false);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
      material: product.material || "Tiêu chuẩn",
      quantity: 1,
    };
    addToCart(cartItem);
  };

  return (
    <div className="favorite-dropdown">
      <div className="favorite-header">
        <div className="header-title">
          <IoHeartOutline className="icon" />
          <span>Sản phẩm yêu thích ({favoriteItems.length})</span>
        </div>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="empty-favorite">
          <IoHeartOutline className="empty-icon" />
          <p>Danh sách yêu thích trống</p>
          <Link
            to="/trang-suc"
            onClick={handleClose}
            className="continue-shopping"
          >
            KHÁM PHÁ NGAY
          </Link>
        </div>
      ) : (
        <>
          <div className="favorite-list">
            {favoriteItems.map((item) => (
              <div key={item.id} className="favorite-item">
                <div className="item-image">
                  <img src={item.thumbnail} alt={item.name} />
                </div>

                <div className="item-details">
                  <div className="item-name-row">
                    <h3>{item.name}</h3>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromFavorite(item.id)}
                      title="Xóa khỏi yêu thích"
                    >
                      <IoCloseOutline />
                    </button>
                  </div>

                  <p className="price">
                    {parseFloat(item.price).toLocaleString("vi-VN")}đ
                  </p>

                  <div className="item-bottom-row">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      <IoCartOutline /> THÊM VÀO GIỎ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="favorite-footer">
            <NavLink
              to="/favorites"
              onClick={handleClose}
              className="view-all-btn"
            >
              XEM TẤT CẢ YÊU THÍCH
            </NavLink>
            <Link
              to="/trang-suc"
              onClick={handleClose}
              className="continue-link"
            >
              Tiếp tục tìm kiếm
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoriteDropdown;
