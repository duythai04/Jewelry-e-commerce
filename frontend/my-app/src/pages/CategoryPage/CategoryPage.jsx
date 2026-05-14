import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Heart, Search } from "lucide-react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CategoryPage.scss";
import { useCart } from "../../context/CartContext";

const CategoryPage = () => {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  // hàm xử lý thêm vào giở hàng
  const hanldAddToCart = (e, product) => {
    e.stopPropagation();

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

  const [searchParams, setSearchParams] = useSearchParams();

  const categorySlug = searchParams.get("category");

  const [categoryInfo, setCategoryInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentSort = searchParams.get("sort") || "newest";
  const currentMaterial = searchParams.get("material") || "";

  // PAGINATION

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15;

  const getPaginationGroup = () => {
    const maxVisible = 6; // Tổng số phần tử tối đa muốn hiển thị

    if (totalPages <= maxVisible) {
      // Nếu tổng trang nhỏ hơn hoặc bằng 6, hiện tất cả: [1, 2, 3, 4, 5, 6]
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Nếu tổng trang > 6, xử lý dấu "..."
    if (currentPage <= 3) {
      // Đang ở các trang đầu: [1, 2, 3, 4, "...", totalPages]
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      // Đang ở các trang cuối: [1, "...", totalPages-3, totalPages-2, totalPages-1, totalPages]
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // Đang ở giữa: [1, "...", currentPage, "...", totalPages]
    return [1, "...", currentPage, "...", totalPages];
  };

  // Reset page khi đổi filter/sort/category
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, currentSort, currentMaterial]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filterGroups = [
    {
      title: "Sản phẩm",
      key: "product",
      options: ["Dây chuyền", "Nhẫn", "Vòng cổ", "Bông tai", "Đồng hồ"],
    },
    {
      title: "Chất liệu",
      key: "material",
      options: ["Vàng 18K", "Vàng Trắng", "Bạc S925", "Kim Cương"],
    },
    {
      title: "Khoảng giá",
      key: "price",
      options: ["Dưới 5tr", "5tr - 10tr", "10tr - 20tr", "Trên 20tr"],
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        // API category
        if (categorySlug) {
          try {
            const catRes = await axios.get(
              `http://localhost:5000/api/categories/${categorySlug}`,
            );

            if (catRes.data.success) {
              setCategoryInfo(catRes.data.data);
            }
          } catch (err) {
            setCategoryInfo({
              name: categorySlug.replace(/-/g, " ").toUpperCase(),
              description: "Bộ sưu tập trang sức tinh tế.",
            });
          }
        }

        // API products
        const response = await axios.get(`http://localhost:5000/api/products`, {
          params: {
            category: categorySlug,
            sort: currentSort,
            material: currentMaterial,
          },
        });

        if (response.data.success) {
          const dataFromApi = response.data.products || [];

          setProducts(dataFromApi);

          setTimeout(() => {
            AOS.refresh();
          }, 100);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [categorySlug, currentSort, currentMaterial]);

  // Sort
  const handleSortChange = (e) => {
    searchParams.set("sort", e.target.value);

    setSearchParams(searchParams);
  };

  // Material filter
  const handleMaterialChange = (materialValue) => {
    if (currentMaterial === materialValue) {
      searchParams.delete("material");
    } else {
      searchParams.set("material", materialValue);
    }

    setSearchParams(searchParams);
  };

  if (loading) {
    return (
      <div className="loading-container">
        Đang tìm kiếm trang sức phù hợp...
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Banner */}
      <section className="category-banner">
        <div className="banner-overlay"></div>

        <img
          src={
            categoryInfo?.image ||
            "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80"
          }
          alt={categoryInfo?.name}
          className="banner-bg"
        />

        <div className="banner-content">
          <h1 className="category-title" data-aos="fade-up">
            {categoryInfo?.name || "Trang Sức"}
          </h1>

          <p
            className="category-subtitle"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {categoryInfo?.description}
          </p>
        </div>
      </section>

      <div className="container main-layout">
        {/* Sidebar */}
        <aside className="filter-sidebar">
          <div className="sidebar-header">
            <h3>BỘ LỌC</h3>

            <span
              className="clear-btn"
              onClick={() => setSearchParams({ category: categorySlug })}
            >
              Xóa tất cả
            </span>
          </div>

          {filterGroups.map((group, idx) => (
            <div key={idx} className="filter-group">
              <h4 className="filter-title">{group.title}</h4>

              <ul className="filter-options">
                {group.options.map((opt, i) => (
                  <li key={i}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={
                          group.key === "material"
                            ? currentMaterial === opt
                            : false
                        }
                        onChange={() =>
                          group.key === "material" && handleMaterialChange(opt)
                        }
                      />

                      <span className="checkmark"></span>

                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Products */}
        <main className="products-container">
          <div className="products-top-bar">
            <div className="breadcrumb">
              <span>Trang chủ</span> /
              <span className="active">{categoryInfo?.name}</span>
            </div>

            <div className="sort-wrapper">
              <span>{products.length} Sản phẩm</span>

              <select value={currentSort} onChange={handleSortChange}>
                <option value="newest">Mới nhất</option>

                <option value="price_asc">Giá: Thấp đến Cao</option>

                <option value="price_desc">Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {products.length > 0 ? (
              currentProducts.map((product, index) => (
                <div
                  key={product.id || index}
                  className="product-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                  data-aos="fade-up"
                  data-aos-delay={(index % 12) * 50}
                >
                  <div className="product-image">
                    <img
                      src={
                        product.thumbnail || "https://via.placeholder.com/400"
                      }
                      alt={product.name}
                      onMouseOver={(e) =>
                        product.hover_image &&
                        (e.currentTarget.src = product.hover_image)
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.src = product.thumbnail)
                      }
                    />

                    {product.is_new === 1 && (
                      <div className="product-badge">New</div>
                    )}

                    <div className="product-actions">
                      <button className="action-btn" title="Thêm vào yêu thích">
                        <Heart size={20} />
                      </button>
                      <button className="action-btn" title="Xem nhanh">
                        <Search size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>

                    <p className="product-price">
                      {parseFloat(product.price).toLocaleString("vi-VN")}đ
                    </p>

                    <button
                      className="add-to-cart"
                      onClick={(e) => hanldAddToCart(e, product)}
                    >
                      THÊM VÀO GIỎ
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <p>Không có sản phẩm nào phù hợp với danh mục này.</p>
              </div>
            )}
          </div>

          {/* pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {/* Nút Previous */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="page-btn nav-btn"
              >
                ←
              </button>

              {getPaginationGroup().map((item, index) => {
                if (item === "...") {
                  return (
                    <span key={`dots-${index}`} className="pagination-dots">
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={item}
                    onClick={() => handlePageChange(item)}
                    className={`page-btn ${currentPage === item ? "active" : ""}`}
                  >
                    {item}
                  </button>
                );
              })}

              {/* Nút Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="page-btn nav-btn"
              >
                →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
