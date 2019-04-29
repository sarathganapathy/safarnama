import { ACTIONS_TYPES } from '../constants/constants';

/**
 * @desc initial state which will is pased to reducer.
 * @type {Object} initialState
 */
const initialState = {
  blogs: []
};

/**
 * @desc reducer function for handling the blogs
 * @param {Object} state - state
 * @param {Object} action - action with payload and type
 * @return {Object} this function returns new state.
 */
const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.INITIAL_DATA:
      return {
        ...state,
        ...{
          blogs: [...state.blogs, ...action.payload.blogs]
        }
      };
    case ACTIONS_TYPES.ADD_BLOB:
      return {
        ...state,
        ...{
          blogs: [...state.blogs, action.payload]
        }
      };
    default: return state;
  }
};

export default blogsReducer;
