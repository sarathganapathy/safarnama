import { ACTIONS_TYPES } from '../constants/constants';
import tempData from '../component/helper/tempdata';

/**
 * @desc action creator for add reviewComment
 * @param {Object} payload - payload which will be attached to the action
 * @return {Object} this function returns action with type and payload.
 */
export const addReviewComment = payload => ({ type: ACTIONS_TYPES.ADD_COMMENT, payload });

/**
 * @desc action creator for setInitialData
 * @param {Object} payload - payload which will be attached to the action
 * @return {Object} this function returns action with type and payload.
 */
export const setInitialData = payload => ({ type: ACTIONS_TYPES.INITIAL_DATA, payload });

/**
 * @desc action creator for addBlog
 * @param {Object} payload - payload which will be attached to the action
 * @return {Object} this function returns action with type and payload.
 */
export const addBlog = payload => ({ type: ACTIONS_TYPES.ADD_BLOB, payload });

/**
 * @desc redux thunk action creator for getting asynchronous initial safarnama data
 * @return {Function} this function returns function to dispatch after asynchronous call.
 */
export const getInitialSafarnamaData = () => dispatch => setTimeout(() => dispatch(
  setInitialData({ ...tempData })
), 0);

/**
 * @desc redux thunk action creator for creating the user blog
 * @return {Function} this function returns function to dispatch after asynchronous call.
 */
export const createUserBlog = blog => dispatch => setTimeout(() => dispatch(
  addBlog(blog)
), 0);

/**
 * @desc redux thunk action creator for creating the reviews
 * @return {Function} this function returns function to dispatch after asynchronous call.
 */
export const createUserReview = reviews => dispatch => setTimeout(() => dispatch(
  addReviewComment(reviews)
), 0);
