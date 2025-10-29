import express from "express";
import blogController from "../controllers/blog.controllers.js";

const router = express.Router();

router.post("/blog", blogController.createBlog);
router.get("/blog", blogController.getAllBlogs);
router.get("/blog/:id", blogController.getBlogById);
router.put("/blog/:id", blogController.updateBlogById);
router.delete("/blog/:id", blogController.deleteBlogById);

export default router;
