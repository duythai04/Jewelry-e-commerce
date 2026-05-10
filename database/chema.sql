-- =========================================
-- CREATE DATABASE
-- =========================================

CREATE DATABASE jewelry_shop
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE jewelry_shop;

-- =========================================
-- USERS
-- =========================================

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(255) NOT NULL,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    phone VARCHAR(20),

    avatar VARCHAR(500),

    role ENUM('customer', 'admin') DEFAULT 'customer',

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- =========================================
-- USER ADDRESSES
-- =========================================

CREATE TABLE user_addresses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    receiver_name VARCHAR(255),

    phone VARCHAR(20),

    province VARCHAR(100),

    district VARCHAR(100),

    ward VARCHAR(100),

    detail_address TEXT,

    is_default BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================================
-- CATEGORIES
-- =========================================

CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(255) NOT NULL,

    slug VARCHAR(255) UNIQUE NOT NULL,

    description TEXT,

    image VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- PRODUCTS
-- =========================================

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    category_id BIGINT NOT NULL,

    name VARCHAR(500) NOT NULL,

    slug VARCHAR(500) UNIQUE NOT NULL,

    sku VARCHAR(100) UNIQUE,

    short_description TEXT,

    description LONGTEXT,

    material VARCHAR(100),

    gender ENUM('male', 'female', 'unisex'),

    price DECIMAL(12,2) NOT NULL,

    discount_price DECIMAL(12,2),

    stock INT DEFAULT 0,

    thumbnail VARCHAR(500),

    view_count INT DEFAULT 0,

    sold_count INT DEFAULT 0,

    is_featured BOOLEAN DEFAULT FALSE,

    is_new BOOLEAN DEFAULT FALSE,

    status ENUM('active', 'inactive') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
);

-- =========================================
-- PRODUCT IMAGES
-- =========================================

CREATE TABLE product_images (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    product_id BIGINT NOT NULL,

    image_url VARCHAR(500) NOT NULL,

    is_primary BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================================
-- PRODUCT VARIANTS
-- =========================================

CREATE TABLE product_variants (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    product_id BIGINT NOT NULL,

    size VARCHAR(50),

    color VARCHAR(50),

    stone_type VARCHAR(100),

    stock INT DEFAULT 0,

    extra_price DECIMAL(12,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================================
-- PRODUCT SPECS
-- =========================================

CREATE TABLE product_specs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    product_id BIGINT NOT NULL,

    spec_name VARCHAR(255),

    spec_value VARCHAR(255),

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================================
-- TAGS
-- =========================================

CREATE TABLE tags (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    name VARCHAR(100) UNIQUE NOT NULL
);

-- =========================================
-- PRODUCT TAGS
-- =========================================

CREATE TABLE product_tags (
    product_id BIGINT NOT NULL,

    tag_id BIGINT NOT NULL,

    PRIMARY KEY (product_id, tag_id),

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE,

    FOREIGN KEY (tag_id)
    REFERENCES tags(id)
    ON DELETE CASCADE
);

-- =========================================
-- CARTS
-- =========================================

CREATE TABLE carts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================================
-- CART ITEMS
-- =========================================

CREATE TABLE cart_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    cart_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    variant_id BIGINT,

    quantity INT DEFAULT 1,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (cart_id)
    REFERENCES carts(id)
    ON DELETE CASCADE,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE,

    FOREIGN KEY (variant_id)
    REFERENCES product_variants(id)
    ON DELETE SET NULL
);

-- =========================================
-- COUPONS
-- =========================================

CREATE TABLE coupons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    code VARCHAR(100) UNIQUE NOT NULL,

    discount_percent INT,

    max_discount DECIMAL(12,2),

    min_order_value DECIMAL(12,2),

    quantity INT DEFAULT 0,

    expired_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- ORDERS
-- =========================================

CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    coupon_id BIGINT,

    address_id BIGINT,

    full_name VARCHAR(255),

    phone VARCHAR(20),

    address TEXT,

    total_price DECIMAL(12,2) NOT NULL,

    shipping_fee DECIMAL(12,2) DEFAULT 0,

    note TEXT,

    payment_method ENUM(
        'cod',
        'momo',
        'vnpay',
        'paypal'
    ) DEFAULT 'cod',

    payment_status ENUM(
        'pending',
        'paid',
        'failed'
    ) DEFAULT 'pending',

    order_status ENUM(
        'pending',
        'confirmed',
        'shipping',
        'completed',
        'cancelled'
    ) DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id),

    FOREIGN KEY (coupon_id)
    REFERENCES coupons(id)
    ON DELETE SET NULL,

    FOREIGN KEY (address_id)
    REFERENCES user_addresses(id)
    ON DELETE SET NULL
);

-- =========================================
-- ORDER ITEMS
-- =========================================

CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    order_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    variant_id BIGINT,

    quantity INT NOT NULL,

    price DECIMAL(12,2) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

    FOREIGN KEY (product_id)
    REFERENCES products(id),

    FOREIGN KEY (variant_id)
    REFERENCES product_variants(id)
    ON DELETE SET NULL
);

-- =========================================
-- PAYMENTS
-- =========================================

CREATE TABLE payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    order_id BIGINT NOT NULL,

    provider ENUM(
        'momo',
        'vnpay',
        'paypal'
    ),

    transaction_id VARCHAR(255),

    amount DECIMAL(12,2),

    status ENUM(
        'pending',
        'success',
        'failed'
    ) DEFAULT 'pending',

    paid_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
);

-- =========================================
-- ORDER TRACKING
-- =========================================

CREATE TABLE order_tracking (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    order_id BIGINT NOT NULL,

    status VARCHAR(100),

    note TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
);

-- =========================================
-- REVIEWS
-- =========================================

CREATE TABLE reviews (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    rating INT CHECK(rating >= 1 AND rating <= 5),

    comment TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================================
-- WISHLISTS
-- =========================================

CREATE TABLE wishlists (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================================
-- INVENTORY LOGS
-- =========================================

CREATE TABLE inventory_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    product_id BIGINT NOT NULL,

    type ENUM('import', 'export'),

    quantity INT,

    note TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================================
-- BANNERS
-- =========================================

CREATE TABLE banners (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    title VARCHAR(255),

    image_url VARCHAR(500),

    link VARCHAR(500),

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- CONTACTS
-- =========================================

CREATE TABLE contacts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    full_name VARCHAR(255),

    email VARCHAR(255),

    subject VARCHAR(255),

    message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- SEO
-- =========================================

CREATE TABLE seo (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    product_id BIGINT UNIQUE,

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

-- =========================================
-- REFRESH TOKENS
-- =========================================

CREATE TABLE refresh_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT NOT NULL,

    token TEXT NOT NULL,

    expired_at DATETIME,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- =========================================
-- INDEXES
-- =========================================

CREATE INDEX idx_product_name
ON products(name);

CREATE INDEX idx_product_category
ON products(category_id);

CREATE INDEX idx_order_user
ON orders(user_id);

CREATE INDEX idx_review_product
ON reviews(product_id);

CREATE INDEX idx_cart_user
ON carts(user_id);

CREATE INDEX idx_wishlist_user
ON wishlists(user_id);

