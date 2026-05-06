import React from 'react';
import { ShoppingBag, Heart, Search } from 'lucide-react'; 
import './FeaturedProducts.scss';

const products = [
  {
    id: 1,
    name: "Nhẫn Kim Cương Eternal",
    category: "Rings",
    price: "25,000,000đ",
    img1: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
    img2: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?q=80&w=1000",
    badge: "New"
  },
  {
    id: 2,
    name: "Dây Chuyền Aura Gold",
    category: "Necklaces",
    price: "18,500,000đ",
    img1: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
    img2: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000",
    badge: ""
  },
  {
    id: 3,
    name: "Bông Tai Sapphire",
    category: "Earrings",
    price: "12,200,000đ",
    img1: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQysIvl2VUlUnPVJOXMwruxz9VCrja1PrLDFZRgx-ngKFq6SY_bNWKV2xURl-03D1KwO7T-QlPQf04qLlF0dKk-TOB4vTMdBKp6fH1oX6qaEgveU7CrGMHTjfrnpHJ2TIz0tlG8668&usqp=CAc",
    img2: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
    badge: "Sale"
  },
  {
    id: 4,
    name: "Vòng Tay Moonlight",
    category: "Bracelets",
    price: "32,000,000đ",
    img1: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
    img2: "https://bizweb.dktcdn.net/100/337/219/products/5f43e49b-a5ea-439d-b7e8-ed3142f47bae.jpg?v=1743479287637",
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