import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Parallax, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './HeroHero.scss';

const HeroHero = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070",
      title: "Radiant",
      subtitle: "EMERALD COLLECTION",
      desc: "Vẻ đẹp vượt thời gian từ những viên kim cương tinh tuyển nhất."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070",
      title: "Authentic",
      subtitle: "GOLDEN ESSENCE",
      desc: "Nâng tầm đẳng cấp với trang sức vàng 18K chế tác thủ công."
    }
    ,

    {
      id: 2,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2069&auto=format&fit=crop",
      title: "Authentic",
      subtitle: "GOLDEN ESSENCE",
      desc: "Nâng tầm đẳng cấp với trang sức vàng 18K chế tác thủ công."
    }
    
  ];

  return (
    <section className="hero-modern">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax, EffectCreative]}
        parallax={true} 
        speed={1500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        grabCursor={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="modern-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="slide-bg" 
              style={{ backgroundImage: `url(${slide.image})` }}
              data-swiper-parallax="20%" 
            ></div>

            <div className="container">
              <div className="content-box">
                <h5 data-swiper-parallax="-300" className="subtitle">
                  {slide.subtitle}
                </h5>
                <h1 data-swiper-parallax="-500" className="title">
                  {slide.title}
                </h1>
                <p data-swiper-parallax="-700" className="description">
                  {slide.desc}
                </p>
                <div data-swiper-parallax="-900" className="btn-group">
                  <button className="btn-primary">KHÁM PHÁ NGAY</button>
                  <button className="btn-outline">XEM BỘ SƯU TẬP</button>
                </div>
              </div>
            </div>

            <div className="floating-card" data-swiper-parallax="-1200">
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