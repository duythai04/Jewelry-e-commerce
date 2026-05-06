import React from 'react';
import './Categories.scss';

const categories = [
  { 
    name: 'Dây Chuyền', 
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRZaA83cQqzA4jz6q11wsYQYr0ms1qkZpyL5YgCPW_8TNU3VyPhh3nR-DSbGHAkIln4QVqH9mxJ2vWcXfwwkFvyGUk2kuJo5O0quu1eN94lI5upI4kvQvWO8ZW1vE0TBjM07se-rO0S&usqp=CAc' 
  },
  { 
    name: 'Nhẫn Cưới', 
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQOnCKll9Wzp_P6iawPlW6GhzGaQh1gLgJVc-wsYhYIBx3t-oLy4WnKmF4xgvyl_GahQbDZPwmG9gTZIt8CLPfGyGyeRTo2JqD3SS_Y7dW0qJ0O8MFWIoCqcpfa73NT3b173Gmiog&usqp=CAc' 
  },
  { 
    name: 'Bông Tai', 
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTLk2ZeWpZCvogoufs55UmYhJvLsHZl6I9FqgYtTOlgsMjVlL_YYShiQQm5mIGWkIdwtAe1uJAsID1TPcnSIUgpjsDcH6zShbQQyh69u1sByAHEJ1dsvdDuhDNIFaRXQ7M1U1J9uA&usqp=CAc' 
  },
  { 
    name: 'Vòng Tay', 
    image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQNMkbG4ExDlp0elEiBwGsIL-DciyxAgkcqw8yrTOrLTdSH4Puf-wS3BHCtVpW9e-g-8Q93144ZB1Sgbro2mJLBeuxyaaC_QKAQf3rc0db9AtQnnk49WkoNtma1CY74lWDwOJh8hA&usqp=CAc' 
  },
  { 
    name: 'Đồng Hồ', 
    image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvmFxNJLL28nY_Rzfi6kwoRdPwEBR-2wekC2fQFE7bR9zOEl4KdX24Xs7nQAZYVZGAAiOzfo1Y2NYO0aqa_Vaq1bhNuWuWRt7fti__nHolQUHwQC7jiIeT2vACMxh5AAbIxuKCBRw&usqp=CAc' 
  },
];

const Categories = () => {
  return (
    <section className="categories-section" >
      <div className="container" >
        <h3>KHÁM PHÁ CÁC DANH MỤC</h3>
        <div className="category-list">
          {categories.map((cat, index) => (
            <div key={index} className="category-item" data-aos="fade-up">
              <div className="icon-wrapper">
                <img src={cat.image} alt={cat.name} className="category-img" />
              </div>
              <p className="category-name">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;