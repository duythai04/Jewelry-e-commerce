import React from 'react';
import { ArrowRight } from 'lucide-react';
import './CollectionStory.scss';

const CollectionStory = () => {
  return (
    <section className="collection-story">
      <div className="story-container" data-aos="fade-right">
        
        {/* Khối bên trái: Ảnh lớn nghệ thuật */}
        <div className="story-image-main">
          <div className="image-wrapper" data-aos="fade-up">
            <img 
              src="https://static.alltime.ru/obj/catalog/jewellary/pandora/img/big/799216C01__5.jpg" 
              alt="Luxury Craftsmanship" 
            />
          </div>
          <div className="floating-info" data-aos="fade-right">
             <span>Handcrafted Excellence</span>
          </div>
        </div>

        {/* Khối bên phải: Nội dung & Ảnh nhỏ */}
        <div className="story-content">
          <div className="text-wrapper">
            <span className="subtitle">THE ART OF JEWELRY</span>
            <h2 className="title">Kiệt Tác <br/> Từ Sự Tinh Tế</h2>
            <p className="description">
              Mỗi món trang sức tại Lumina không chỉ là vật trang sức, mà là một tác phẩm nghệ thuật 
              được chế tác thủ công suốt hàng trăm giờ. Chúng tôi kết hợp kỹ thuật truyền thống 
              cùng tư duy thẩm mỹ hiện đại để tôn vinh vẻ đẹp độc bản của bạn.
            </p>
            
            <div className="signature">
              <span className="name">Lumina Luxury</span>
              <div className="line"></div>
            </div>

            <button className="btn-explore">
              KHÁM PHÁ CÂU CHUYỆN <ArrowRight size={18} />
            </button>
          </div>

          {/* Ảnh nhỏ đè lên để tạo chiều sâu */}
          <div className="story-image-secondary" data-aos="fade-left">
            <img 
              src="https://product.hstatic.net/200000351153/product/s6143_model_fb3b4a7e62e048bda3921798d0ecfc22_master.jpg" 
              alt="Detail Craft" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CollectionStory;