/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const WorkWithUs = require("../models/workWithUs");
const logger = require("../config/logConfig");
const { getToken } = require("../helper/util");
const { ERROR_MESSAGE, STATUS_CODE, SUCCESS_MESSAGE } = require('../constants/constants');

/**
 * return the workWithUs details
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getWorkWithUsDetails = (req, res) => {
  WorkWithUs.find().exec()
    .then(([workWithUs]) => {
      res.status(STATUS_CODE.SUCCESS).json({ workWithUs });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("workWithUsController - getWorkWithUsDetails :", error);
    });
};

/**
 * creates the workWithUs details first time.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 * This should be caled by admin only once at begining
 */
const createWorkWithUsDetails = async (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  try {
    const { description, phone, email } = req.body;
    const workWithUs = await WorkWithUs.find().exec();
    if (workWithUs.length) {
      throw Object({ message: ERROR_MESSAGE.WORK_WITH_US_ALREADY_EXISTS });
    } else {
      // creates single document
      const workWithUsDetails = await new WorkWithUs({
        _id: new mongoose.Types.ObjectId(),
        description,
        phone,
        email
      }).save();

      // send the response
      res.status(STATUS_CODE.CREATED).json({
        message: SUCCESS_MESSAGE.WORK_WITH_US_CREATED,
        workWithUsDetails
      });
    }
  } catch (error) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
    logger.error("workWithUsController - createWorkWithUsDetails :", error);
  }
};


/**
 * updates the mongodb document in workWithUs collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const updateWorkWithUs = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { workWithUsId: id } } = req;
  WorkWithUs.update({ _id: id }, { $set: req.body })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.WORK_WITH_US_UPDATED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("workWithUsController - updateWorkWithUs :", error);
    });
};

/**
 * deletes  the  document in workWithUs collection by id.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const deleteWorkWithUsDetails = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { workWithUsId: id } } = req;
  WorkWithUs.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.WORK_WITH_US_DELETED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("workWithUsController - deleteWorkWithUsDetails :", error);
    });
};

module.exports = {
  deleteWorkWithUsDetails,
  createWorkWithUsDetails,
  updateWorkWithUs,
  getWorkWithUsDetails
};
