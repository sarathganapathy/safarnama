import { combineReducers } from 'redux';
import eventsData from "./eventsReducer";
import blogsData from "./blogsReducer";
import reviewsData from "./reviewsReducer";
import workWithUsData from "./workWithUsReducer";
import aboutUsData from "./aboutUsReducer";

/**
 * @desc combines all the reducers
 * @param {Object} reducers - reducers which need to be combined.
 * @return {Object} returns combined reducers.
 */
export default combineReducers({
  aboutUsData,
  eventsData,
  blogsData,
  reviewsData,
  workWithUsData
});
