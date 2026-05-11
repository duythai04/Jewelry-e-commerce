import express from "express";
const router = express.Router();
import { getCategoryDetail, getAllCategories } from "../controllers/category.controller.js";

router.get("/", getAllCategories);

router.get("/:slug", getCategoryDetail);

export default router;