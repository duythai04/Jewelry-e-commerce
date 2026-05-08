import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './HeroHero.scss';

const HeroHero = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=75&w=1400&auto=format",
      title: "Radiant",
      subtitle: "EMERALD COLLECTION",
      desc: "Vẻ đẹp vượt thời gian từ những viên kim cương tinh tuyển nhất."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=75&w=1400&auto=format",
      title: "Authentic",
      subtitle: "GOLDEN ESSENCE",
      desc: "Nâng tầm đẳng cấp với trang sức vàng 18K chế tác thủ công."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=75&w=1400&auto=format",
      title: "Luxury",
      subtitle: "LIMITED EDITION",
      desc: "Thiết kế độc quyền dành cho những khách hàng tinh tế nhất."
    }
  ];

  return (
    <section className="hero-modern">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax]}
        speed={800}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true }}
        className="modern-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            
            {/* Background image (lazy load) */}
            <div className="slide-bg">
              <img src={slide.image} loading="lazy" alt={slide.title} />
            </div>

            <div className="container">
              <div className="content-box">
                <h5 data-swiper-parallax="-150" className="subtitle">
                  {slide.subtitle}
                </h5>
                <h1 data-swiper-parallax="-250" className="title">
                  {slide.title}
                </h1>
                <p data-swiper-parallax="-350" className="description">
                  {slide.desc}
                </p>
                <div data-swiper-parallax="-450" className="btn-group">
                  <button className="btn-primary">KHÁM PHÁ NGAY</button>
                  <button className="btn-outline">XEM BỘ SƯU TẬP</button>
                </div>
              </div>
            </div>

            <div className="floating-card" data-swiper-parallax="-300">
              <span>NEW ARRIVAL 2026</span>
              <p>Giới hạn 50 phiên bản toàn cầu</p>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroHero;