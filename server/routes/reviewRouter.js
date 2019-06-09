const express = require('express');
const {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  deleteReview
} = require('../controllers/reviewController');

const router = express.Router();

// methods for handling reviews.

router.get("/", getAllReviews);

router.post("/", createReview);

router.get("/:reviewId", getReviewById);

router.patch("/:reviewId", updateReview);

router.put("/:reviewId", updateReview);

router.delete("/:reviewId", deleteReview);

module.exports = router;
