const path = require("path");
const { LOCAL_PATHS } = require('../constants/constants');

/**
 * convert the relative path to uri path, so users can load the image from client directly
 * @param {String} imagePath - relative event path
 * @return {String} returns the uri path.
 */
const convertRelativeImagePathToURIPath = imagePath => `/${LOCAL_PATHS.IMAGE_PATH}/${path.basename(imagePath)}`;

/**
 * Filter the event data
 * @param {Object} event - event object
 * @return {Object} returns the filtered event.
 */
const getFilteredEvent = ({ eventImage, ...remainingEventAttrs }) => ({
  ...remainingEventAttrs,
  ...{ eventImage: convertRelativeImagePathToURIPath(eventImage) }
});


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

module.exports= {
  getFilteredSafarnamaData,
  getFilteredEvent
};
