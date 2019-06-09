/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const Event = require("../models/event");
const logger = require("../config/logConfig");
const { getFilteredEvent } = require("../helper/util");
const { ERROR_MESSAGE, STATUS_CODE, SUCCESS_MESSAGE } = require('../constants/constants');

/**
 * return the events as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getAllEvents = (req, res) => {
  Event.find().exec().lean()
    .then((events) => {
      res.status(STATUS_CODE.SUCCESS).json({
        count: events.length,
        events: events.map(event => getFilteredEvent(event))
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("eventController - getAllEvents :", error);
    });
};

/**
 * creates the event as document in the collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const createEvent = (req, res) => {
  new Event({
    _id: new mongoose.Types.ObjectId(),
    bookingURL: req.body.bookingURL,
    eventName: req.body.eventName,
    description: req.body.description,
    eventLocation: req.body.eventLocation,
    details: req.body.details,
    currency: req.body.currency,
    price: req.body.price,
    eventStartDate: req.body.eventStartDate,
    eventEndDate: req.body.eventEndDate,
    eventImage: req.file.path
  })
    .save()
    .then((event) => {
      res.status(STATUS_CODE.CREATED).json({
        message: SUCCESS_MESSAGE.EVENT_CREATED,
        createdEvent: event
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("eventController - createEvent :", error);
    });
};

/**
 * return the event by provided identifier  as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getEventById = (req, res) => {
  const { params: { eventId: id } } = req;
  Event.findById(id)
    .lean()
    .exec()
    .then((event) => {
      if (event) {
        res.status(STATUS_CODE.SUCCESS).json(getFilteredEvent(event));
      } else {
        res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: ERROR_MESSAGE.EVENT_NOT_FOUND });
      }
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("eventController - getEventById :", error);
    });
};

/**
 * updates the mongodb document .
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const updateEvent = (req, res, next) => {
  const { params: { eventId: id } } = req;
  Event.update({ _id: id }, { $set: req.body })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.EVENT_UPDATED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("eventController - updateEvent :", error);
    });
};

/**
 * deletes  the  document in collection by id.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const deleteEvent = (req, res) => {
  const { params: { eventId: id } } = req;
  Event.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.EVENT_DELETED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("eventController - deleteEvent :", error);
    });
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  getEventById,
  deleteEvent
};
