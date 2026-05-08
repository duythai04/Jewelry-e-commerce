import React from 'react';
import { ShoppingBag, Heart, Search } from 'lucide-react'; 
import './FeaturedProducts.scss';

const products = [
  {
    id: 1,
    name: "Nhẫn Bạc 925 Thanh Mảnh Đính Đá Princess - VCR06",
    category: "Rings",
    price: "690.000đ",
    img1: "https://bizweb.dktcdn.net/100/461/213/products/nhan-bac-925-thanh-manh-dinh-da-princess-vcr06.jpg?v=1774939136173",
    img2: "https://bizweb.dktcdn.net/100/461/213/products/vcr08-vcr05-vcr06-vsr02-vcr02-vsr03-1689007356920.png?v=1774939132970",
    badge: "New"
  },
  {
    id: 2,
    name: "Vòng Cổ Bạc 925 Hình Cỏ 4 Lá Đá Nhảy 4 Leaf Clover - VGN08",
    category: "Necklaces",
    price: "1.790.000đ",
    img1: "https://bizweb.dktcdn.net/100/461/213/products/vgn08-1711427922882.png?v=1775808825887",
    img2: "https://bizweb.dktcdn.net/100/461/213/products/vge11-vgn08-1711427920912.png?v=1775808825887",
    badge: ""
  },
  {
    id: 3,
    name: "Khuyên Tai Bạc 925 Tròn Đá Nhảy Ngôi Sao Star Dancing Stone - VCE46",
    category: "Earrings",
    price: "1.690.000đ",
    img1: "https://bizweb.dktcdn.net/100/461/213/products/vce46-1734512295529.jpg?v=1774802251623",
    img2: "https://bizweb.dktcdn.net/thumb/medium/100/461/213/products/vce46-1736234287489.jpg?v=1774802254797",
    badge: "Sale"
  },
  {
    id: 4,
    name: "Kiềng Tay Bạc 925 Trái Tim Đá Nhảy Viền Đá Stone Bling Heart - VYB54",
    category: "Bracelets",
    price: "2.390.000đ",
    img1: "https://bizweb.dktcdn.net/100/461/213/products/kieng-tay-bac-925-trai-tim-da-nhay-dinh-da-vien-stone-bling-heart-vyb54.jpg?v=1775077075590",
    img2: "https://bizweb.dktcdn.net/100/461/213/products/vyb54-1697526330669.png?v=1775077078213",
    badge: ""
  }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-section">
      <div className="section-header">
        <span className="subtitle">SPECIAL SELECTION</span>
        <h2 className="title">Sản Phẩm Nổi Bật</h2>
        <div className="divider"></div>
      </div>

      <div className="products-grid" data-aos="fade-down">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* Image Container */}
            <div className="product-image">
              {product.badge && <span className="badge">{product.badge}</span>}
              
              <img src={product.img1} alt={product.name} className="img-primary" />
              <img src={product.img2} alt={product.name} className="img-secondary" />

              {/* Hover Actions */}
              <div className="product-actions">
                <button className="action-btn" title="Thêm vào yêu thích">
                  <Heart size={20} />
                </button>
                <button className="action-btn" title="Xem nhanh">
                  <Search size={20} />
                </button>
                <button className="action-btn add-to-cart" title="Thêm vào giỏ">
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <p className="category">{product.category}</p>
              <h3 className="name">{product.name}</h3>
              <p className="price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="view-all">
        <button className="btn-view-all">XEM TẤT CẢ SẢN PHẨM</button>
      </div>
    </section>
  );
};

export default FeaturedProducts;