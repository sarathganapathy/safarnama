import { ACTIONS_TYPES } from '../constants/constants';
import {
  addBlogData,
  addReviewData,
  getBlogData,
  getReviewData,
  getSafarnamaData
} from "../data/index";

/**
 * @desc action creator for add reviewComments
 * @param {Object} payload - payload which will be attached to the action
 * @return {Object} this function returns action with type and payload.
 */
export const addReviewComments = payload => ({ type: ACTIONS_TYPES.ADD_COMMENT, payload });

/**
 * @desc action creator for setInitialData
 * @param {Object} payload - payload which will be attached to the action
 * @return {Object} this function returns action with type and payload.
 */
export const setInitialData = payload => ({ type: ACTIONS_TYPES.INITIAL_DATA, payload });

/**
 * @desc action creator for addBlogs
 * @param {Object} payload - payload which will be attached to the action
 * @return {Object} this function returns action with type and payload.
 */
export const addBlogs = payload => ({ type: ACTIONS_TYPES.ADD_BLOG, payload });


// -------------------THUNK-ACTIONS--------------------------

/**
 * @desc redux thunk action creator for getting asynchronous initial safarnama data
 * @return {Function} this function returns function to dispatch after asynchronous call.
 */
export const getInitialSafarnamaData = () => async (dispatch) => {
  try {
    const { data: safarnamaData } = await getSafarnamaData();
    dispatch(
      setInitialData(safarnamaData)
    );
  } catch (error) {
    // @TO-DO NEED TO HANDLE
  }
};

/**
 * @desc redux thunk action creator for creating the user blog
 * @param {Object} blog - blog Object
 * @return {Function} this function returns function to dispatch after asynchronous call.
 */
export const createUserBlog = blog => async (dispatch) => {
  try {
    await addBlogData(blog);
    const { data: { blogs } } = await getBlogData();
    dispatch(
      addBlogs(blogs)
    );
  } catch (error) {
    // @TO-DO NEED TO HANDLE
  }
};

/**
 * @desc redux thunk action creator for creating the reviews
 * @param {Object} review - review Object
 * @return {Function} this function returns function to dispatch after asynchronous call.
 */
export const createUserReview = review => async (dispatch) => {
  try {
    await addReviewData(review);
    const { data: { reviews } } = await getReviewData();
    dispatch(
      addReviewComments(reviews)
    );
  } catch (error) {
    // @TO-DO NEED TO HANDLE
  }
};
