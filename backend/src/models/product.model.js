import pool from "../config/db.js";


export const getProducts = async (
  filters = {}
) => {
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

    JOIN categories c
      ON p.category_id = c.id

    WHERE p.status = 'active'
  `;

  const params = [];


  // category fiter

  if (filters.category) {
    sql += ` AND c.slug = ? `;
    params.push(filters.category);
  }


  // material

  if (filters.material) {
    sql += ` AND p.material = ? `;
    params.push(filters.material);
  }


  // search

  if (filters.keyword) {
    sql += ` AND p.name LIKE ? `;
    params.push(
      `%${filters.keyword}%`
    );
  }



  // price filter

  if (filters.minPrice) {
    sql += ` AND p.price >= ? `;
    params.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    sql += ` AND p.price <= ? `;
    params.push(filters.maxPrice);
  }



  // sort
  if (filters.sort === "price_asc") {
    sql += ` ORDER BY p.price ASC `;
  } else if (
    filters.sort === "price_desc"
  ) {
    sql += ` ORDER BY p.price DESC `;
  } else if (
    filters.sort === "newest"
  ) {
    sql += ` ORDER BY p.created_at DESC `;
  } else {
    sql += ` ORDER BY p.created_at DESC `;
  }



  // limit

  if (filters.limit) {
    sql += ` LIMIT ? `;
    params.push(
      Number(filters.limit)
    );
  }



  const [rows] = await pool.execute(
    sql,
    params
  );

  return rows;
};

export default getProducts;