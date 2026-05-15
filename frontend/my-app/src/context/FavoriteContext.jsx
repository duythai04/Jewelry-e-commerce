import React, { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  // 1. Khởi tạo từ LocalStorage để không mất dữ liệu khi F5
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const saved = localStorage.getItem("chichi_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Lưu vào LocalStorage mỗi khi danh sách thay đổi
  useEffect(() => {
    localStorage.setItem("chichi_favorites", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  // 3. Thêm/Xóa sản phẩm (Toggle)
  const toggleFavorite = (product) => {
    setFavoriteItems((prev) => {
      const isExisted = prev.find((item) => item.id === product.id);
      if (isExisted) {
        // Nếu có rồi thì xóa đi
        return prev.filter((item) => item.id !== product.id);
      } else {
        // Nếu chưa có thì thêm vào
        return [...prev, product];
      }
    });
  };

  // 4. Xóa một sản phẩm cụ thể
  const removeFromFavorite = (productId) => {
    setFavoriteItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // 5. Kiểm tra sản phẩm đã có trong danh sách yêu thích chưa (để đổi màu icon)
  const isFavorite = (productId) => {
    return favoriteItems.some((item) => item.id === productId);
  };

  // 6. Xóa tất cả
  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  const value = {
    favoriteItems,
    favoriteCount: favoriteItems.length,
    toggleFavorite,
    removeFromFavorite,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteProvider");
  }
  return context;
};