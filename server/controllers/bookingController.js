/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const Booking = require("../models/booking");
const logger = require("../config/logConfig");
const { getToken } = require("../helper/util");
const { ERROR_MESSAGE, STATUS_CODE, SUCCESS_MESSAGE } = require('../constants/constants');

/**
 * return the booking as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getAllBookings = (req, res) => {
  Booking.find().exec()
    .then((bookings) => {
      res.status(STATUS_CODE.SUCCESS).json({ count: bookings.length, bookings });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("bookingController - getAllBookings :", error);
    });
};

/**
 * creates the booking as document in the collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const createBooking = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  new Booking({
    _id: new mongoose.Types.ObjectId(),
    user: req.body.userId,
    event: req.body.eventId,
    bookingDate: req.body.bookingDate,
    paymentOption: req.body.paymentOption
  })
    .save()
    .then((booking) => {
      res.status(STATUS_CODE.CREATED).json({
        message: SUCCESS_MESSAGE.BOOKING_CREATED,
        bookingDetails: booking
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("bookingController - createBooking :", error);
    });
};

/**
 * return the booking by provided identifier  as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getBookingById = (req, res) => {
  const { params: { bookingId: id } } = req;
  Booking.findById(id)
    .exec()
    .then((booking) => {
      if (booking) {
        res.status(STATUS_CODE.SUCCESS).json(booking);
      } else {
        res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: ERROR_MESSAGE.BOOKING_NOT_FOUND });
      }
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("bookingController - getBookingById :", error);
    });
};

/**
 * updates the mongodb document in booking collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const updateBooking = (req, res, next) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { bookingId: id } } = req;
  Booking.update({ _id: id }, { $set: req.body })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.BOOKING_UPDATED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("bookingController - updateBooking :", error);
    });
};

/**
 * deletes  the  document in booking collection by id.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const deleteBooking = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { bookingId: id } } = req;
  Booking.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.BOOKING_DELETED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("bookingController - deleteBooking :", error);
    });
};

module.exports = {
  getAllBookings,
  createBooking,
  updateBooking,
  getBookingById,
  deleteBooking
};
