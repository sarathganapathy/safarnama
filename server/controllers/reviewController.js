/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const Review = require("../models/review");
const logger = require("../config/logConfig");
const { getToken } = require("../helper/util");
const { ERROR_MESSAGE, STATUS_CODE, SUCCESS_MESSAGE } = require('../constants/constants');

/**
 * return the reviews as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getAllReviews = (req, res) => {
  Review.find()
    .populate("user", "_id, name")
    .exec()
    .then((reviews) => {
      res.status(STATUS_CODE.SUCCESS).json(
        {
          count: reviews.length,
          reviews: reviews.map(({
            _id, details, selectedStars, user: { _id: userId, name }
          }) => ({
            _id, details, userId, name, selectedStars
          }))
        }
      );
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("reviewController - getAllReviews :", error);
    });
};

/**
 * creates the review as document in the collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const createReview = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  new Review({
    _id: new mongoose.Types.ObjectId(),
    details: req.body.details,
    user: req.session.userId,
    selectedStars: req.body.selectedStars
  })
    .save()
    .then((review) => {
      res.status(STATUS_CODE.CREATED).json({
        message: SUCCESS_MESSAGE.REVIEW_CREATED,
        createdReview: review
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("reviewController - createReview :", error);
    });
};

/**
 * return the review by provided identifier  as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getReviewById = (req, res) => {
  const { params: { reviewId: id } } = req;
  Review.findById(id)
    .populate("user", "_id, name")
    .exec()
    .then((review) => {
      if (review) {
        const {
          _id, details, selectedStars, user: { _id: userId, name }
        } = review;
        res.status(STATUS_CODE.SUCCESS).json({
          _id, details, userId, name, selectedStars
        });
      } else {
        res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: ERROR_MESSAGE.REVIEW_NOT_FOUND });
      }
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("reviewController - getReviewById :", error);
    });
};

/**
 * updates the mongodb document in review collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const updateReview = (req, res, next) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { reviewId: id } } = req;
  Review.update({ _id: id }, { $set: req.body })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.REVIEW_UPDATED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("reviewController - updateReview :", error);
    });
};

/**
 * deletes  the  document in review collection by id.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const deleteReview = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { reviewId: id } } = req;
  Review.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.REVIEW_DELETED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("reviewController - deleteReview :", error);
    });
};

module.exports = {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  deleteReview
};
