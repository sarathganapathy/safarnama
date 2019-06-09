import { ACTIONS_TYPES } from '../constants/constants';

/**
 * @desc initial state which will is pased to reducer.
 * @type {Object} initialState
 */
const initialState = {
  reviews: []
};

/**
 * @desc reducer function for handling the reviews
 * @param {Object} state - state
 * @param {Object} action - action with payload and type
 * @return {Object} this function returns new state.
 */
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.INITIAL_DATA:
      return {
        ...state,
        ...{
          reviews: [...state.reviews, ...action.payload.reviews]
        }
      };
    case ACTIONS_TYPES.ADD_COMMENT:
      return {
        ...state,
        ...{
          reviews: [...action.payload]
        }
      };
    default: return state;
  }
};

export default reviewsReducer;
