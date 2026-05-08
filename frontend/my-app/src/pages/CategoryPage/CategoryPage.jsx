import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import './CategoryPage.scss';

const CategoryPage = () => {
  const { categoryId } = useParams(); 
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterGroups = [
    { title: 'Sản phẩm', options: ['Dây chuyền', 'Nhẫn', 'Vòng cổ', 'Bông tai', 'Đồng hồ']},
    { title: 'Chất liệu', options: ['Vàng 18K', 'Vàng Trắng', 'Bạc S925', 'Kim Cương'] },
    { title: 'Khoảng giá', options: ['Dưới 5tr', '5tr - 10tr', '10tr - 20tr', 'Trên 20tr'] },
    { title: 'Bộ sưu tập', options: ['Spring Love', 'Eternal', 'Signature'] },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const mockData = {
          id: categoryId,
          name: categoryId === 'nhan-cuoi' ? 'Nhẫn Cưới' : 
                categoryId === 'day-chuyen' ? 'Dây Chuyền' : 'Trang Sức Cao Cấp',
          description: 'Khám phá biểu tượng của sự sang trọng qua những thiết kế tinh xảo nhất.',
          bannerImg: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=80', 
        };
        
        const mockProducts = [
          { id: 1, name: 'Nhẫn Kim Cương Eternal', price: '25.000.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/nhan-bac-925-thanh-manh-dinh-da-princess-vcr06.jpg?v=1774939136173' },
          { id: 2, name: 'Dây Chuyền Vàng 18K', price: '12.500.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/vgn08-1711427922882.png?v=1775808825887' },
          { id: 3, name: 'Bông Tai Ngọc Trai', price: '8.200.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/vce46-1734512295529.jpg?v=1774802251623' },
          { id: 4, name: 'Vòng Tay Rose Gold', price: '15.000.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/kieng-tay-bac-925-trai-tim-da-nhay-dinh-da-vien-stone-bling-heart-vyb54.jpg?v=1775077075590' },
          { id: 5, name: 'Bông Tai Đính Đá', price: '5.200.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/vce46-1734512295529.jpg?v=1774802251623' },
          { id: 6, name: 'Nhẫn Bạc Minimalist', price: '1.200.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/nhan-bac-925-thanh-manh-dinh-da-princess-vcr06.jpg?v=1774939136173' },
          { id: 7, name: 'Nhẫn Kim Cương Eternal', price: '25.000.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/nhan-bac-925-thanh-manh-dinh-da-princess-vcr06.jpg?v=1774939136173' },
          { id: 8, name: 'Dây Chuyền Vàng 18K', price: '12.500.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/vgn08-1711427922882.png?v=1775808825887' },
          { id: 9, name: 'Bông Tai Ngọc Trai', price: '8.200.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/vce46-1734512295529.jpg?v=1774802251623' },
          { id: 10, name: 'Vòng Tay Rose Gold', price: '15.000.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/kieng-tay-bac-925-trai-tim-da-nhay-dinh-da-vien-stone-bling-heart-vyb54.jpg?v=1775077075590' },
          { id: 11, name: 'Bông Tai Đính Đá', price: '5.200.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/vce46-1734512295529.jpg?v=1774802251623' },
          { id: 12, name: 'Nhẫn Bạc Minimalist', price: '1.200.000đ', image: 'https://bizweb.dktcdn.net/100/461/213/products/nhan-bac-925-thanh-manh-dinh-da-princess-vcr06.jpg?v=1774939136173' },
        ];

        setCategoryData(mockData);
        setProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) return <div className="loading">Hương sắc trang sức đang được tải...</div>;

  return (
    <div className="category-page">
      {/* banner */}
      <section className="category-banner">
        <div className="banner-overlay"></div>
        <img src={categoryData.bannerImg} alt={categoryData.name} className="banner-bg" />
        <div className="banner-content">
          <h1 className="category-title" data-aos="fade-up">{categoryData.name}</h1>
          <p className="category-subtitle" data-aos="fade-up" data-aos-delay="200">{categoryData.description}</p>
        </div>
      </section>

      {/* 2. main-layout*/}
      <div className="container main-layout">
        
        {/* side-bar*/}
        <aside className="filter-sidebar">
          <div className="sidebar-header">
            <h3>BỘ LỌC</h3>
            <span>Xóa tất cả</span>
          </div>
          
          {filterGroups.map((group, idx) => (
            <div key={idx} className="filter-group">
              <h4 className="filter-title">{group.title}</h4>
              <ul className="filter-options">
                {group.options.map((opt, i) => (
                  <li key={i}>
                    <label className="checkbox-container">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* products */}
        <main className="products-container">
          {/* Top Info bar */}
          <div className="products-top-bar">
            <div className="breadcrumb">
              <span>Trang chủ</span> / <span className="active">{categoryData.name}</span>
            </div>
            <div className="sort-wrapper">
              <span>{products.length} Sản phẩm</span>
              <select>
                <option>Sắp xếp: Mới nhất</option>
                <option>Giá: Thấp đến Cao</option>
                <option>Giá: Cao đến Thấp</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={product.id} className="product-card" data-aos="fade-up" data-aos-delay={index * 50}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-badge">New</div>
                  <div className="quick-view">Xem nhanh</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <button className="add-to-cart">THÊM VÀO GIỎ</button>
                </div>
              </div>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
};

export default CategoryPage;