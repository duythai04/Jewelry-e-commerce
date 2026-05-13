import React from "react";
import "./SocialAndNewsletter.scss";

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const SendIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const instagramPhotos = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600",
  "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600",
  "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=600",
  "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600",
];

const SocialAndNewsletter = () => {
  return (
    <section className="social-newsletter-section">
      {/* Instagram Section */}
      <div className="instagram-container">
        <div className="insta-header" data-aos="fade-left">
          <InstagramIcon size={28} color="#b4975a" />
          <span className="subtitle" data-aos="fade-up">
            FOLLOW US ON INSTAGRAM
          </span>
          <h2 className="insta-handle" data-aos="fade-up">
            @lumina.luxury
          </h2>
        </div>

        <div className="insta-grid">
          {instagramPhotos.map((img, index) => (
            <div
              key={index}
              className="insta-item"
              data-aos="fade-left"
              data-aos-delay={index * 300}
            >
              <img src={img} alt={`Insta ${index}`} />
              <div className="insta-overlay">
                <InstagramIcon size={30} color="#fff" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-container" data-aos="fade-right">
        <div className="newsletter-card">
          <div className="content">
            <span className="sub">ĐẶC QUYỀW THÀNH VIÊN</span>
            <h2 className="title">Đăng Ký Nhận Bản Tin</h2>
            <p className="desc">
              Nhận thông báo về các bộ sưu tập mới nhất và ưu đãi đặc quyền dành
              riêng cho bạn.
            </p>

            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Địa chỉ email của bạn..."
                required
              />
              <button type="submit">
                ĐĂNG KÝ <SendIcon size={18} />
              </button>
            </form>

            <p className="policy">
              Bằng cách đăng ký, bạn đồng ý với <u>Chính sách bảo mật</u> của
              chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialAndNewsletter;
