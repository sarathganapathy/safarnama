const Blog = require("../models/blog");
const Events = require("../models/event");
const Review = require("../models/review");
const WorkWithUs = require("../models/workWithUs");
const logger = require("../config/logConfig");
const { getFilteredSafarnamaData } = require("../helper/util");
const { STATUS_CODE } = require('../constants/constants');

/**
 * @desc controller to get the initial safarnama data on page load
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @returns {undefined} does not return any value
 */
const getInitialData = async (req, res) => {
  try {
    const safarnamaData = await Promise.all([
      Blog.find().populate("user", " _id name").exec(),
      Events.find().lean().exec(),
      Review.find().populate("user", "_id, name").exec(),
      WorkWithUs.find().exec()
    ]);
    res.status(STATUS_CODE.SUCCESS).json(getFilteredSafarnamaData(safarnamaData));
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
    logger.error("initialLoadController - getInitialData :", error);
  }
};

module.exports = { getInitialData };
