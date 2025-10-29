import express from "express";
import blogController from "../controllers/blog.controllers.js";
import userControllers from "../controllers/user.controllers.js";
import { validateUser } from "../middlewares/validation.middlewares.js";

const router = express.Router();
// Blog Routes
router.post("/blog", validateUser, blogController.createBlog);
router.get("/blog", blogController.getAllBlogs);
router.get("/blog/:id", blogController.getBlogById);
router.put("/blog/:id", validateUser, blogController.updateBlogById);
router.delete("/blog/:id", validateUser, blogController.deleteBlogById);

// User Routes
router.post("/register", userControllers.userRegister);
router.post("/login", userControllers.userLogin);

export default router;
