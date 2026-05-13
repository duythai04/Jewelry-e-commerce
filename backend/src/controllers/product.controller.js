import { getProducts, getProductById } from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    console.log("Query nhận được:", req.query);
    const filters = {
      category: req.query.category || req.query.categories,
      material: req.query.material,
      keyword: req.query.keyword,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
    };

    const products = await getProducts(filters);

    res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Sever error",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get Product Detail Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

