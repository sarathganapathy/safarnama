const express = require('express');
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog
} = require('../controllers/blogController');

const router = express.Router();

// methods for handling blogs.

router.get("/", getAllBlogs);

router.post("/", createBlog);

router.get("/:blogId", getBlogById);

router.patch("/:blogId", updateBlog);

router.put("/:blogId", updateBlog);

router.delete("/:blogId", deleteBlog);

module.exports = router;
