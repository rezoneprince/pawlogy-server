const express = require("express");
// const path = require("path");
const Blog = require("../models/blog.js");

const router = express.Router();

// Create blog (no image upload)
router.post("/", async (req, res) => {
  try {
    const { title, description, image, metaTitle, metaDescription } = req.body;

    const blog = new Blog({
      title,
      description,
      image,
      metaTitle,
      metaDescription,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get single blog by id
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "blog is not found" });
    }
    res.json(blog);
  } catch (err) {
    return res.status(500).json({ err: "err.message" });
  }
});

module.exports = router;
