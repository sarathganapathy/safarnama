/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const logger = require("../config/logConfig");
const { ERROR_MESSAGE, STATUS_CODE, SUCCESS_MESSAGE } = require('../constants/constants');
/**
 * return the blogs as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getAllBlogs = (req, res) => {
  Blog.find()
    .populate("user", " _id name")
    .exec()
    .then((blogs) => {
      res.status(STATUS_CODE.SUCCESS).json(
        {
          count: blogs.length,
          blogs: blogs.map(({ _id, details, user: { _id: userId, name } }) => ({
            _id, details, userId, name
          }))
        }
      );
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("blogController - getAllBolgs :", error);
    });
};

/**
 * creates the blog as document in the collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const createBlog = (req, res) => {
  new Blog({
    _id: new mongoose.Types.ObjectId(),
    details: req.body.details,
    user: req.body.userId
  })
    .save()
    .then((blog) => {
      res.status(STATUS_CODE.CREATED).json({
        message: SUCCESS_MESSAGE.BLOG_CREATED,
        createdBlog: blog
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("blogController - createBlog :", error);
    });
};

/**
 * return the blogs by provided identifier  as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getBlogById = (req, res) => {
  const { params: { blogId: id } } = req;
  Blog.findById(id)
    .populate("user", " _id name")
    .exec()
    .then((blog) => {
      if (blog) {
        const { _id, details, user: { _id: userId, name } } = blog;
        res.status(STATUS_CODE.SUCCESS).json({
          _id, details, userId, name
        });
      } else {
        res
          .status(404)
          .json({ message: ERROR_MESSAGE.BLOG_NOT_FOUND });
      }
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("blogController - getBlogById :", error);
    });
};

/**
 * updates the mongodb document in blog collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const updateBlog = (req, res, next) => {
  const { params: { blogId: id } } = req;
  Blog.update({ _id: id }, { $set: req.body })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.BLOG_UPDATED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("blogController - updateBlog :", error);
    });
};

/**
 * deletes  the  document in blog collection by id.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const deleteBlog = (req, res) => {
  const { params: { blogId: id } } = req;
  Blog.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.BLOG_DELETED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("blogController - deleteBlog :", error);
    });
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog
};
