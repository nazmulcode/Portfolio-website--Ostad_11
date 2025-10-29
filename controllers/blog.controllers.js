import Blog from "../models/blog.model.js";

// Create a new blog post

const createBlog = async (req, res) => {
  try {
    const { title, img, category, description, short_description } = req.body;
    const newBlog = await Blog.create({
      title,
      img,
      category,
      description,
      short_description,
    });
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {}
  res.status(500).json({
    success: false,
    error: error.toString(),
    message: "Failed to create blog",
  });
};

// get all blog posts

const getAllBlogs = async (req, res) => {
  try {
    const facetedDate = {
      $facet: {
        totalCount: [{ $count: "count" }],
        blogs: [
          { $sort: { createdAt: -1 } },
          {
            $project: {
              title: 1,
              img: 1,
              category: 1,
              description: 1,
              short_description: 1,
            },
          },
        ],
      },
    };
    const blogs = await Blog.aggregate([facetedDate]);
    res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully",
      totalBlogs: blogs[0].totalCount[0].count,
      data: blogs[0].blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Failed to retrieve blogs",
    });
  }
};

// get single blog post by id

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Blog.findById(id);
    res.status(200).json({
      success: true,
      message: "Blog retrieved successfully",
      data,
    });
  } catch (error) {}
  res.status(500).json({
    success: false,
    error: error.toString(),
    message: "Failed to retrieve blog",
  });
};

// update a blog post by id
const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDate = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedDate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Failed to update blog",
    });
  }
};

// delete a blog post by id
const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Blog.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.toString(),
      message: "Failed to delete blog",
    });
  }
};

const blogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};

export default blogController;
