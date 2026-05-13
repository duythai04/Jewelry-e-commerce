import React from "react";
import { Link } from "react-router-dom";
import "./Categories.scss";
import mainCategories from "./dataCategories";

const Categories = () => {
  return (
    <section className="categories-section">
      <div className="container">
        <h3>KHÁM PHÁ CÁC DANH MỤC</h3>
        <div className="category-list">
          {mainCategories.map((cat, index) => (
            <Link
              key={index}
              to={`/trang-suc?category=${cat.slugPrefix}`}
              className="category-item"
              data-aos="fade-up"
            >
              <div className="icon-wrapper">
                <img src={cat.image} alt={cat.name} className="category-img" />
              </div>
              <p className="category-name">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
