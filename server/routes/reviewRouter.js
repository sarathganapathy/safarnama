const express = require('express');
const passport = require('passport');
const {
  getAllReviews,
  createReview,
  updateReview,
  getReviewById,
  deleteReview
} = require('../controllers/reviewController');
require('../config/passportConfig')(passport);

const router = express.Router();

// methods for handling reviews.

router.get("/", getAllReviews);

router.post("/", passport.authenticate('jwt', { session: false }), createReview);

router.get("/:reviewId", getReviewById);

router.patch("/:reviewId", passport.authenticate('jwt', { session: false }), updateReview);

router.put("/:reviewId", passport.authenticate('jwt', { session: false }), updateReview);

router.delete("/:reviewId", passport.authenticate('jwt', { session: false }), deleteReview);

module.exports = router;
