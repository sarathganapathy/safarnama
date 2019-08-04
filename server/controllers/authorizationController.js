/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const logger = require("../config/logConfig");
const settings = require('../config/passportSetting');

const {
  ERROR_MESSAGE,
  STATUS_CODE,
  SUCCESS_MESSAGE
} = require('../constants/constants');

/**
 * return the jwt token as json in response of the http.
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const login = (req, res) => {
  User.findOne({
    username: req.body.username
  }).exec()
    .then((user) => {
      if (!user) {
        res.status(STATUS_CODE.UNAUTHORIZED).send(
          { message: ERROR_MESSAGE.INVALID_USER }
        );
      } else {
        // check if password matches
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // stores the user session
            req.session.userId = user._id;
            // if user is found and password is right create a token
            const token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.status(STATUS_CODE.SUCCESS).json({
              message: SUCCESS_MESSAGE.LOGIN_SUCCESS,
              token: `JWT ${token}`,
              userDetails: { name: user.name, userName: user.username }
            });
          } else {
            res.status(STATUS_CODE.UNAUTHORIZED).send(
              { message: ERROR_MESSAGE.WRONG_PASSWORD }
            );
          }
        });
      }
    }).catch((error) => {
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
      logger.error("authorizationController - login :", error);
    });
};

/**
 * Clears the user session
 * @param {Object} req - request object
 * @param {Object} res- response object
 * @return { undefined} does not return any value
 */
const logout = (req, res) => {
  req.session.userId= null;
  res.status(STATUS_CODE.SUCCESS).json({
    message: SUCCESS_MESSAGE.LOGOUT_SUCCESS
  });
};

module.exports = {
  login,
  logout
};
