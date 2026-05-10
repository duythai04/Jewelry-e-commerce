import getProducts from '../models/product.model.js';


const getAllProducts = async (req, res) => {
    try {
        const filters = {
            category: req.query.category,
            material: req.query.material,
            keyword: req.query.keyword,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
        }


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
            message: "Sever error"
        });
        
    }
}

export default getAllProducts;