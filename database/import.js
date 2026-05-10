// ========================================
// IMPORT JSON TO MYSQL DATABASE
// File: importData.js
// ========================================

const fs = require("fs");
const mysql = require("mysql2/promise");
const slugify = require("slugify");

// ========================================
// MYSQL CONNECTION
// ========================================

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "230304",
  database: "jewelry_shop",
};

// ========================================
// READ JSON FILE
// ========================================

const rawData = fs.readFileSync(
  "./products.json",
  "utf-8"
);

const products = JSON.parse(rawData);

// ========================================
// HELPER FUNCTIONS
// ========================================

// Convert price
function convertPrice(price) {
  if (!price) return 0;

  return Number(
    price
      .replace(/₫/g, "")
      .replace(/\./g, "")
      .replace(/,/g, "")
      .trim()
  );
}

// Create slug
function createSlug(text) {
  return slugify(text || "", {
    lower: true,
    strict: true,
    locale: "vi",
  });
}

// ========================================
// IMPORT FUNCTION
// ========================================

async function importData() {
  const connection =
    await mysql.createConnection(
      dbConfig
    );

  console.log("Connected MySQL...");

  try {
    // ========================================
    // CATEGORY CACHE
    // ========================================

    const categoryMap = {};

    for (const item of products) {
      // ========================================
      // CATEGORY
      // ========================================

      const categoryName = (
        item.category || "Khác"
      )
        .replace(/_/g, " ")
        .trim();

      const categorySlug =
        createSlug(categoryName);

      let categoryId;

      // Check cache
      if (categoryMap[categorySlug]) {
        categoryId =
          categoryMap[categorySlug];
      } else {
        // Check database
        const [categoryRows] =
          await connection.execute(
            `
            SELECT id
            FROM categories
            WHERE slug = ?
            `,
            [categorySlug]
          );

        if (categoryRows.length > 0) {
          categoryId =
            categoryRows[0].id;
        } else {
          // Insert category
          const [categoryResult] =
            await connection.execute(
              `
              INSERT INTO categories(
                name,
                slug
              )
              VALUES (?, ?)
              `,
              [
                categoryName,
                categorySlug,
              ]
            );

          categoryId =
            categoryResult.insertId;

          console.log(
            `Category inserted: ${categoryName}`
          );
        }

        categoryMap[categorySlug] =
          categoryId;
      }

      // ========================================
      // PRODUCT
      // ========================================

      const productName =
        item.name?.trim() ||
        "Sản phẩm chưa có tên";

      const productSlug =
        createSlug(productName);

      const price = convertPrice(
        item.price
      );

      const thumbnail =
        item.image_primary ||
        item.image_hover ||
        "";

      // Check product exists
      const [productRows] =
        await connection.execute(
          `
          SELECT id
          FROM products
          WHERE slug = ?
          `,
          [productSlug]
        );

      let productId;

      if (productRows.length > 0) {
        productId = productRows[0].id;

        console.log(
          `Product already exists: ${productName}`
        );
      } else {
        // Insert product
        const [productResult] =
          await connection.execute(
            `
            INSERT INTO products(
              category_id,
              name,
              slug,
              price,
              thumbnail,
              stock,
              material,
              status,
              is_new
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
              categoryId,
              productName,
              productSlug,
              price,
              thumbnail,
              100,
              item.material || null,
              "active",
              1,
            ]
          );

        productId =
          productResult.insertId;

        console.log(
          `Product inserted: ${productName}`
        );
      }

      // ========================================
      // PRODUCT IMAGES
      // ========================================

      const images = [];

      // Main image
      if (item.image_primary) {
        images.push({
          url: item.image_primary,
          is_primary: true,
        });
      }

      // Hover image
      if (
        item.image_hover &&
        item.image_hover !==
          item.image_primary
      ) {
        images.push({
          url: item.image_hover,
          is_primary: false,
        });
      }

      // Insert images
      for (const img of images) {
        // Check image exists
        const [imageRows] =
          await connection.execute(
            `
            SELECT id
            FROM product_images
            WHERE product_id = ?
            AND image_url = ?
            `,
            [productId, img.url]
          );

        if (imageRows.length === 0) {
          await connection.execute(
            `
            INSERT INTO product_images(
              product_id,
              image_url,
              is_primary
            )
            VALUES (?, ?, ?)
            `,
            [
              productId,
              img.url,
              img.is_primary,
            ]
          );

          console.log(
            `Image inserted for: ${productName}`
          );
        }
      }
    }

    console.log("");
    console.log(
      "================================="
    );
    console.log("IMPORT SUCCESS");
    console.log(
      "================================="
    );
  } catch (error) {
    console.error(
      "IMPORT ERROR:",
      error
    );
  } finally {
    await connection.end();
  }
}

// ========================================
// RUN
// ========================================

importData();