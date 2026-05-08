import React from 'react';
import { Truck, ShieldCheck, Gem, Gift } from 'lucide-react'; 
import './LuxuryServices.scss';

const services = [
  {
    id: 1,
    icon: <Truck strokeWidth={1.2} size={40} />,
    title: "Giao Hàng Hỏa Tốc",
    desc: "Miễn phí vận chuyển và bảo hiểm toàn quốc cho mọi đơn hàng giá trị cao."
  },
  {
    id: 2,
    icon: <ShieldCheck strokeWidth={1.2} size={40} />,
    title: "Bảo Hành Trọn Đời",
    desc: "Dịch vụ làm mới, xi mạ và thắt dây miễn phí tại hệ thống cửa hàng."
  },
  {
    id: 3,
    icon: <Gem strokeWidth={1.2} size={40} />,
    title: "Kiểm Định Uy Tín",
    desc: "100% kim cương và đá quý có giấy chứng nhận GIA & kiểm định quốc tế."
  },
  {
    id: 4,
    icon: <Gift strokeWidth={1.2} size={40} />,
    title: "Quà Tặng Sang Trọng",
    desc: "Sản phẩm được đóng gói trong hộp nhung cao cấp kèm thiệp chúc mừng."
  }
];

const LuxuryServices = () => {
  return (
    <section className="luxury-services" data-aos="zoom-out-left" data-aos-duration="2000">
      <div className="services-container">
        {services.map((item) => (
          <div key={item.id} className="service-item" data-aos="fade-up">
            <div className="icon-box">
              {item.icon}
            </div>
            <h3 className="service-title">{item.title}</h3>
            <div className="service-divider"></div>
            <p className="service-desc">{item.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default LuxuryServices;