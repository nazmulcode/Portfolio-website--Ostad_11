import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    img: String,
    category: String,
    description: String,
    short_description: String,
  },
  { timestamps: true, versionKey: false }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
