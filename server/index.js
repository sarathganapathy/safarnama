/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongoConfig = require('./config/mongoConfig');
const mainPageRouter = require('./routes/index');
const initialLoadRouter = require('./routes/initialLoadRouter');
const eventRouter = require('./routes/eventRouter');
const userRouter = require('./routes/userRouter');
const blogRouter = require('./routes/blogRouter');
const bookingRouter = require('./routes/bookingRouter');
const reviewRouter = require('./routes/reviewRouter');
const workWithUsRouter = require('./routes/workWithUsRouter');
const logger = require("./config/logConfig");
const { LOCAL_PATHS, ROUTE_PATHS, STATUS_CODE } = require('./constants/constants');
require('./config/environment');

const app = express();
const isDev = process.env.NODE_ENV !== 'production';
const assetFolder = path.resolve(__dirname, '../dist/');
const port = process.env.PORT;

// Set up Mongoose
mongoose.connect(isDev ? mongoConfig.db_dev : mongoConfig.db, { useNewUrlParser: true })
  .then(() => {
    logger.info("Connected to databse");
  })
  .catch((error) => {
    logger.error("error connecting to database", error);
  });

// HTTP request logger middleware for node.js
// Concise output colored by response status for development use.
// The :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initial bundled dist folder to load the client
app.use(express.static(assetFolder));
// all the uploaded files from client will get saved to this folder
app.use(`/${LOCAL_PATHS.IMAGE_PATH}`, express.static(LOCAL_PATHS.IMAGE_PATH));
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(STATUS_CODE.SUCCESS).json({});
  }
  next();
});

// Routes which should handle requests
app.use(ROUTE_PATHS.ROOT, mainPageRouter);
app.use(ROUTE_PATHS.INITIAL_DATA, initialLoadRouter);
app.use(ROUTE_PATHS.EVENTS, eventRouter);
app.use(ROUTE_PATHS.BLOGS, blogRouter);
app.use(ROUTE_PATHS.USERS, userRouter);
app.use(ROUTE_PATHS.BOOKINGS, bookingRouter);
app.use(ROUTE_PATHS.REVIEWS, reviewRouter);
app.use(ROUTE_PATHS.WORK_WITH_US, workWithUsRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = STATUS_CODE.NOT_FOUND;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || STATUS_CODE.INTERNAL_SERVER_ERROR);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => console.info(`Server is listening on port ${port}`));
