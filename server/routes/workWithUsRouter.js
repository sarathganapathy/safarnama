const express = require('express');
const passport = require('passport');
const {
  deleteWorkWithUsDetails,
  createWorkWithUsDetails,
  updateWorkWithUs,
  getWorkWithUsDetails
} = require('../controllers/workWithUsController');
require('../config/passportConfig')(passport);

const router = express.Router();

// methods for handling users.

router.get("/", getWorkWithUsDetails);

router.post("/", passport.authenticate('jwt', { session: false }), createWorkWithUsDetails);

router.patch("/:workWithUsId", passport.authenticate('jwt', { session: false }), updateWorkWithUs);

router.put("/:workWithUsId", passport.authenticate('jwt', { session: false }), updateWorkWithUs);

router.delete("/:workWithUsId", passport.authenticate('jwt', { session: false }), deleteWorkWithUsDetails);

module.exports = router;
