/**
 * @constant
 * @enum { Object } enum for default values.
 */
const DEFAULT_VALUES = {
  BCRYPT_ROUNDS: 10
};

/**
 * @constant
 * @enum { Object } enum for loal path.
 */
const LOCAL_PATHS = {
  IMAGE_PATH: "server/uploads"
};

/**
 * @constant
 * @enum { Object } enum for regex.
 */
const REGEX = {
  COLON_MATCH: /:/g
};

/**
 * @constant
 * @enum { Object } enum for route path.
 */
const ROUTE_PATHS = {
  AUTHORIZATION: "/authorization",
  BLOGS: "/blogs",
  BOOKINGS: "/bookings",
  EVENTS: "/events",
  INITIAL_DATA: "/initialData",
  REVIEWS: "/reviews",
  ROOT: "/",
  USERS: "/users",
  WORK_WITH_US: "/workWithUs"
};

/**
 * @constant
 * @enum { Object } enum for server status code.
 */
const STATUS_CODE = {
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  SUCCESS: 200,
  UNAUTHORIZED: 401
};

/**
 * @constant
 * @enum { Object } enum for success messages.
 */
const SUCCESS_MESSAGE = {
  BLOG_CREATED: "Created blog successfully",
  BLOG_NOT_FOUND: "No valid entry found for blog ID",
  BLOG_UPDATED: "Blog updated",
  BLOG_DELETED: "Blog Deleted",
  BOOKING_CREATED: "Created booking successfully",
  BOOKING_NOT_FOUND: "No valid entry found for booking ID",
  BOOKING_UPDATED: "Booking updated",
  BOOKING_DELETED: "Booking Deleted",
  EVENT_CREATED: "Created event successfully",
  EVENT_NOT_FOUND: "No valid entry found for event ID",
  EVENT_UPDATED: "Event updated",
  EVENT_DELETED: "Event Deleted",
  LOGIN_SUCCESS: "Successfully logged in",
  LOGOUT_SUCCESS: "Successfully logged out",
  REVIEW_CREATED: "Created review successfully",
  REVIEW_NOT_FOUND: "No valid entry found for review ID",
  REVIEW_UPDATED: "Review updated",
  REVIEW_DELETED: "Review Deleted",
  USER_CREATED: "Created user successfully",
  USER_NOT_FOUND: "No valid entry found for user ID",
  USER_UPDATED: "User updated",
  USER_DELETED: "User Deleted",
  WORK_WITH_US_CREATED: "Created work with us successfully",
  WORK_WITH_US_UPDATED: "Work with us updated",
  WORK_WITH_US_DELETED: "Work with us Deleted"
};

/**
 * @constant
 * @enum { Object } enum for error messages.
 */
const ERROR_MESSAGE = {
  BLOG_NOT_FOUND: "No valid entry found for blog ID",
  BOOKING_UPDATED: "Booking updated",
  EVENT_NOT_FOUND: "No valid entry found for event ID",
  INVALID_USER: "Authentication failed. User not found.",
  REVIEW_NOT_FOUND: "No valid entry found for review ID",
  USER_NOT_FOUND: "No valid entry found for user ID",
  USER_UPDATED: "User updated",
  WORK_WITH_US_ALREADY_EXISTS: "Work With us is already created and it cannot have multiple documents.",
  WRONG_PASSWORD: "Authentication failed. Wrong password."
};

module.exports = {
  DEFAULT_VALUES,
  ERROR_MESSAGE,
  LOCAL_PATHS,
  ROUTE_PATHS,
  REGEX,
  SUCCESS_MESSAGE,
  STATUS_CODE
};
