const path = require("path");
const { LOCAL_PATHS } = require('../constants/constants');


/**
 * convert the date string to valid ISO format to save in db
 * If date string is already ISO string , It will convert to same
 * @param {String} imagePath - relative event path
 * @return {String} returns the formated ISO8601 date string
 */
const convertDateStringToISO = dateString => new Date(dateString).toISOString();

/**
 * convert the relative path to uri path, so users can load the image from client directly
 * @param {String} imagePath - relative event path
 * @return {String} returns the uri path.
 */
const convertRelativeImagePathToURIPath = imagePath => (
  imagePath ? `/${LOCAL_PATHS.IMAGE_PATH}/${path.basename(imagePath)}`: "");

/**
 * Filter the event data
 * @param {Object} event - event object
 * @return {Object} returns the filtered event.
 */
const getFilteredEvent = (events) => {
  const {
    // eslint-disable-next-line no-unused-vars
    eventImage1, eventImage2, eventImage3, ...remainingAttrs
  } = events;
  return {
    ...{
      images: Array.from({ length: 3 }, (_, index) => (
        { eventImage: convertRelativeImagePathToURIPath(events[`eventImage${index+1}`]) }
      ))
    },
    ...remainingAttrs
  };
};


/**
 * Filter the initial safarnama data
 * @param {Array} Data - array of document objects of events, blogs, reviews, workWithus
 * @return {Object} returns the filtered safarnama data.
 */
const getFilteredSafarnamaData = ([blogs, events, reviews, [workWithUs]]) => ({
  events: events.map(event => getFilteredEvent(event)),
  workWithUs,
  blogs: blogs.map(({ _id, details, user: { _id: userId, name } }) => ({
    _id, details, userId, name
  })),
  reviews: reviews.map(({
    _id, details, selectedStars, user: { _id: userId, name }
  }) => ({
    _id, details, userId, name, selectedStars
  }))
});

/**
 * returns the jwt token from header
 * @param {String} headers - request header string
 * @return {String | null} returns the token or null.
 */
const getToken = (headers) => {
  if (headers && headers.authorization) {
    const [/* first param jwtstring */, jwtToken] = headers.authorization.split(' ');
    return jwtToken || null;
  } else {
    return null;
  }
};

module.exports= {
  convertDateStringToISO,
  getFilteredSafarnamaData,
  getFilteredEvent,
  getToken
};
