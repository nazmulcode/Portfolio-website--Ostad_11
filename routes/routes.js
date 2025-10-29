import express from "express";
import blogController from "../controllers/blog.controllers.js";
import userControllers from "../controllers/user.controllers.js";

const router = express.Router();
// Blog Routes
router.post("/blog", blogController.createBlog);
router.get("/blog", blogController.getAllBlogs);
router.get("/blog/:id", blogController.getBlogById);
router.put("/blog/:id", blogController.updateBlogById);
router.delete("/blog/:id", blogController.deleteBlogById);

// User Routes
router.post("/register", userControllers.userRegister);
router.post("/login", userControllers.userLogin);

export default router;
