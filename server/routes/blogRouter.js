const express = require('express');
const passport = require('passport');
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog
} = require('../controllers/blogController');
require('../config/passportConfig')(passport);

const router = express.Router();

// methods for handling blogs.

router.get("/", getAllBlogs);

router.post("/", passport.authenticate('jwt', { session: false }), createBlog);

router.get("/:blogId", getBlogById);

router.patch("/:blogId", passport.authenticate('jwt', { session: false }), updateBlog);

router.put("/:blogId", passport.authenticate('jwt', { session: false }), updateBlog);

router.delete("/:blogId", passport.authenticate('jwt', { session: false }), deleteBlog);

module.exports = router;
