import pool from "../config/db.js";

export const getProducts = async (filters = {}) => {
  let sql = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.price,
      p.discount_price,
      p.thumbnail,
      p.is_new,
      p.material,
      p.stock,
      c.name AS category_name,
      c.slug AS category_slug,
      (
        SELECT pi.image_url
        FROM product_images pi
        WHERE pi.product_id = p.id
        AND pi.is_primary = 0
        LIMIT 1
      ) AS hover_image
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'active'
  `;

  const params = [];

  const categoryValue = filters.category || filters.categories;

  if (categoryValue) {
    const normalizedCategory = categoryValue.replace(/_/g, "-");

    sql += ` AND c.slug LIKE ? `;
    params.push(`${normalizedCategory}%`);
  }

  // Lọc theo chất liệu
  if (filters.material) {
    sql += ` AND p.material = ? `;
    params.push(filters.material);
  }

  // Tìm kiếm theo từ khóa
  if (filters.keyword) {
    sql += ` AND p.name LIKE ? `;
    params.push(`%${filters.keyword}%`);
  }

  // Lọc theo giá
  if (filters.minPrice) {
    sql += ` AND p.price >= ? `;
    params.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    sql += ` AND p.price <= ? `;
    params.push(filters.maxPrice);
  }

  // Sắp xếp
  if (filters.sort === "price_asc") {
    sql += ` ORDER BY p.price ASC `;
  } else if (filters.sort === "price_desc") {
    sql += ` ORDER BY p.price DESC `;
  } else {
    sql += ` ORDER BY p.created_at DESC `;
  }

  // Giới hạn số lượng
  if (filters.limit) {
    sql += ` LIMIT ? `;
    params.push(Number(filters.limit));
  }

  const [rows] = await pool.execute(sql, params);
  return rows;
};


// lấy chi tiết sản phẩm (id)

export const getProductById = async (id) => {
  const sql = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.description,
      p.price,
      p.discount_price,
      p.thumbnail,
      p.material,
      p.stock,
      p.is_new,
      p.created_at,

      c.id AS category_id,
      c.name AS category_name,
      c.slug AS category_slug

    FROM products p
    JOIN categories c 
      ON p.category_id = c.id

    WHERE p.id = ?
    AND p.status = 'active'
    LIMIT 1
  `;

  const [rows] = await pool.execute(sql, [id]);

  // Không tìm thấy sản phẩm
  if (rows.length === 0) {
    return null;
  }

  // Lấy sản phẩm đầu tiên
  const product = rows[0];

  // Lấy danh sách ảnh
  const [images] = await pool.execute(
    `
      SELECT 
        id,
        image_url,
        is_primary
      FROM product_images
      WHERE product_id = ?
    `,
    [id]
  );

  // Gắn ảnh vào product
  product.images = images;

  return product;
};

export default getProducts;