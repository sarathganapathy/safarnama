const express = require('express');
const {
  deleteWorkWithUsDetails,
  createWorkWithUsDetails,
  updateWorkWithUs,
  getWorkWithUsDetails
} = require('../controllers/workWithUsController');

const router = express.Router();

// methods for handling users.

router.get("/", getWorkWithUsDetails);

router.post("/", createWorkWithUsDetails);

router.patch("/:workWithUsId", updateWorkWithUs);

router.put("/:workWithUsId", updateWorkWithUs);

router.delete("/:workWithUsId", deleteWorkWithUsDetails);

module.exports = router;
