import * as CategoryModel from "../models/category.model.js";

const getCategoryDetail = async (req, res) => {
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
