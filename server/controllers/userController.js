/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const User = require("../models/user");
const logger = require("../config/logConfig");
const { getToken } = require("../helper/util");
const {
  ERROR_MESSAGE,
  STATUS_CODE,
  SUCCESS_MESSAGE
} = require('../constants/constants');

/**
 * return the users as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getAllUsers = (req, res) => {
  User.find().exec()
    .then((users) => {
      res.status(STATUS_CODE.SUCCESS).json(
        {
          count: users.length,
          users: users.map(({
            _id, name, username, phone, email, dob
          }) => ({
            _id, name, username, phone, email, dob
          }))
        }
      );
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("userController - getAllUsers :", error);
    });
};

/**
 * creates the user as document in the collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const createUser = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    dob: req.body.dob,
    password: req.body.password,
    userType: req.body.userType
  })
    .save()
    .then(({
      _id, name, username, phone, email, dob
    }) => {
      res.status(STATUS_CODE.CREATED).json({
        message: SUCCESS_MESSAGE.USER_CREATED,
        createdUser: {
          _id, name, phone, username, email, dob
        }
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("userController - createUser :", error);
    });
};

/**
 * return the user by provided identifier  as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const getUserById = (req, res) => {
  const { params: { userId: id } } = req;
  User.findById(id)
    .exec()
    .then((user) => {
      if (user) {
        const {
          _id, name, username, phone, email, dob
        } = user;
        res.status(STATUS_CODE.SUCCESS).json({
          _id, name, username, phone, email, dob
        });
      } else {
        res
          .status(STATUS_CODE.NOT_FOUND)
          .json({ message: ERROR_MESSAGE.USER_NOT_FOUND });
      }
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("userController - getUserById :", error);
    });
};

/**
 * updates the mongodb document in user collection.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const updateUser = (req, res, next) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { userId: id } } = req;
  User.update({ _id: id }, { $set: req.body })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.USER_UPDATED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("userController - updateUser :", error);
    });
};

/**
 * deletes  the  document in user collection by id.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const deleteUser = (req, res) => {
  if (!getToken(req.headers)) {
    res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: "no token" });
    return;
  }
  const { params: { userId: id } } = req;
  User.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(STATUS_CODE.SUCCESS).json({
        message: SUCCESS_MESSAGE.USER_DELETED
      });
    })
    .catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        error
      });
      logger.error("userController - deleteUser :", error);
    });
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser
};
