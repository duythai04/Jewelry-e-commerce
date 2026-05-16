import app from "./app.js";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";
import productRotes from "./routes/product.route.js";
import categoryRotes from "./routes/category.route.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();
connectDB();

app.use("/api/products", productRotes);
app.use("/api/categories", categoryRotes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
