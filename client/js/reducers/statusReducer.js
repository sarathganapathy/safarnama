import { ACTIONS_TYPES } from '../constants/constants';

/**
 * @desc initial state which is pased to reducer.
 * @type {Object} initialState
 */
const initialState = {
  isLoading: false,
  hasError: false,
  forceRefreshPage: false
};

/**
 * @desc reducer function for application ststus
 * @param {Object} state - state
 * @param {Object} action - action with payload and type
 * @return {Object} this function returns new state.
 */
const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.STATUS:
      return {
        ...state,
        ...action.payload
      };
    default: return state;
  }
};

export default statusReducer;
