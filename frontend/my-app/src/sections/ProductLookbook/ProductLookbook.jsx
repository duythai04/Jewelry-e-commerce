import React from 'react';
import { Plus, ArrowRight } from 'lucide-react';
import './ProductLookbook.scss';

const lookbookData = {
  mainImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070",
  title: "Glow From Within",
  subtitle: "BỘ SƯU TẬP ÁNH TRĂNG",
  description: "Sự kết hợp hoàn hảo giữa kim cương tự nhiên và vàng trắng 18K, tạo nên vẻ đẹp thanh lịch khó cưỡng.",
  products: [
    {
      id: 1,
      name: "Dây Chuyền Moonlight",
      price: "15.500.000đ",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
      top: "25%", 
      left: "45%"
    },
    {
      id: 2,
      name: "Khuyên Tai Starry",
      price: "8.200.000đ",
      image: 'data:image/jpeg;base64,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',
      top: "15%",
      left: "55%"
    }
  ]
};

const ProductLookbook = () => {
  return (
    <section className="product-lookbook">
      <div className="lookbook-container">
        
        {/* Ảnh Lifestyle lớn với các điểm nhấn (Hotspots) */}
        <div className="lookbook-visual" data-aos="fade-right">
          <div className="image-wrapper">
            <img src={lookbookData.mainImage} alt="Lifestyle" />
            
            {/* điểm tròn trên ảnh */}
            {lookbookData.products.map((p) => (
              <div 
                key={p.id} 
                className="hotspot" 
                style={{ top: p.top, left: p.left }}
              >
                <div className="pulse"></div>
                <div className="icon"><Plus size={14} /></div>
                
                <div className="tooltip">
                  <img src={p.image} alt={p.name} />
                  <div>
                    <p>{p.name}</p>
                    <span>{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danh sách sản phẩm chi tiết */}
        <div className="lookbook-content">
          <header data-aos="fade-left">
            <span className="sub" data-aos="fade-left">{lookbookData.subtitle}</span>
            <h2 className="title">{lookbookData.title}</h2>
            <p className="desc">{lookbookData.description}</p>
          </header>

          <div className="product-list" data-aos="fade-left">
            {lookbookData.products.map((product) => (
              <div key={product.id} className="mini-product-card">
                <div className="img-box">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="info-box">
                  <h4>{product.name}</h4>
                  <p className="price">{product.price}</p>
                  <button className="btn-link" data-aos="fade-left">
                    CHI TIẾT <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-shop-all" data-aos="fade-left">MUA TRỌN BỘ SƯU TẬP</button>
        </div>

      </div>
    </section>
  );
};

export default ProductLookbook;