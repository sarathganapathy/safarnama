import { ACTIONS_TYPES } from '../constants/constants';

/**
 * @desc initial state which will is pased to reducer.
 * @type {Object} initialState
 */
const initialState = {
  aboutUs: {}
};

/**
 * @desc reducer function for handling the aboutUs
 * @param {Object} state - state
 * @param {Object} action - action with payload and type
 * @return {Object} this function returns new state.
 */
const aboutUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.INITIAL_DATA:
      return {
        ...state,
        ...{
          aboutUs: action.payload.aboutUs
        }
      };
    default: return state;
  }
};

export default aboutUsReducer;
