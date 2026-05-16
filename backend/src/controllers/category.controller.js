import * as CategoryModel from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getAllCategories();

    if (!categories || categories.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No categories found",
      });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategoryDetail = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await CategoryModel.getCategoryBySlug(slug);

    if (!category) {
      return res.status(200).json({
        success: true,
        data: {
          name: "Bộ Sưu Tập Trang Sức",
          description: "Khám phá những thiết kế tinh xảo và sang trọng nhất.",
          image: null,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default getCategoryDetail;
