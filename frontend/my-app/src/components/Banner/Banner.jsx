import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import './Banner.scss';

const slideData = [
  {
    id: 1,
    title: "LUMINA JEWELRY - Tỏa Sáng Vẻ Đẹp Quý Phái",
    subTitle: "Bộ sưu tập trang sức cao cấp mới nhất đã ra mắt.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "SỰ TINH XẢO TRONG TỪNG ĐƯỜNG NÉT",
    subTitle: "Nâng tầm phong cách với trang sức kim cương tự nhiên.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop",
  }
  ,

  {
  id: 3,
  title: "NHẪN KIM CƯƠNG ETERNAL LOVE",
  subTitle: "Sự kết hợp hoàn hảo giữa vàng trắng 18K và những viên kim cương tinh tuyển.",
  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
}


];

const Banner = () => {
  return (
    <section className="banner-swiper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={'fade'} 
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="mySwiper"
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-container">
              <div className="content">
                <h2>{slide.title}</h2>
                <p>{slide.subTitle}</p>
                <button className="btn-cta">KHÁM PHÁ NGAY</button>
              </div>
              <div className="image-wrapper">
                <img src={slide.image} alt="Jewelry" />
                <span className="model-info">{slide.model}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;