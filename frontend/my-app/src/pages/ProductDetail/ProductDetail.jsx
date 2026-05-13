import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiMinus, FiPlus, FiShoppingBag, FiCheck } from "react-icons/fi";

import "./ProductDetail.scss";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`,
        );
        if (response.data.success) {
          const productData = response.data.data;
          setProduct(productData);
          if (productData.images?.length > 0) {
            const primaryImage = productData.images.find(
              (img) => img.is_primary === 1,
            );
            setMainImage(
              primaryImage?.image_url || productData.images[0].image_url,
            );
          } else {
            setMainImage(productData.thumbnail);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="not-found">Sản phẩm không tồn tại.</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="separator">/</span>
          <Link to={`/category/${product.category_slug}`}>
            {product.category_name}
          </Link>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-grid">
          {/* image */}
          <div className="product-gallery" data-aos="fade-up">
            <div className="main-image-container">
              <img
                src={mainImage || "https://via.placeholder.com/800"}
                alt={product.name}
              />
            </div>
            <div className="thumbnail-grid">
              {product.images?.map((img) => (
                <div
                  key={img.id}
                  className={`thumb-item ${mainImage === img.image_url ? "active" : ""}`}
                  onClick={() => setMainImage(img.image_url)}
                >
                  <img src={img.image_url} alt="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* right content*/}
          <div
            className="product-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="category-tag">{product.category_name}</span>
            <h1 className="product-title">{product.name}</h1>

            <div className="price-tag">
              {parseFloat(product.price).toLocaleString("vi-VN")}
              <span>đ</span>
            </div>

            <div className="short-info">
              <div className="info-item">
                <span className="label">Chất liệu:</span>
                <span className="value">{product.material}</span>
              </div>
              <div className="info-item">
                <span className="label">Tình trạng:</span>
                <span
                  className={`value status ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
                >
                  {product.stock > 0 ? (
                    <>
                      <FiCheck /> Còn hàng
                    </>
                  ) : (
                    "Hết hàng"
                  )}
                </span>
              </div>
            </div>

            <div className="purchase-section">
              <div className="quantity-control">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <FiMinus />
                </button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity((q) => q + 1)}>
                  <FiPlus />
                </button>
              </div>

              <div className="action-btns">
                <button className="btn-add-cart">
                  <FiShoppingBag /> THÊM VÀO GIỎ
                </button>
                <button className="btn-buy-now">MUA NGAY</button>
              </div>
            </div>

            <div className="product-tabs">
              <div className="tab-header">Mô tả sản phẩm</div>
              <div className="tab-content">
                {product.description ||
                  "Một tuyệt tác trang sức mang phong cách cổ điển xen lẫn hiện đại, được chế tác tỉ mỉ để tôn vinh vẻ đẹp quý phái của người sở hữu."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
