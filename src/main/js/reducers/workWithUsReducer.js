import { ACTIONS_TYPES } from '../constants/constants';

/**
 * @desc initial state which will is pased to reducer.
 * @type {Object} initialState
 */
const initialState = {
  workWithUs: {}
};

/**
 * @desc reducer function for handling the workWithUs
 * @param {Object} state - state
 * @param {Object} action - action with payload and type
 * @return {Object} this function returns new state.
 */
const workWithUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.INITIAL_DATA:
      return {
        ...state,
        ...{
          workWithUs: action.payload.workWithUs
        }
      };
    default: return state;
  }
};

export default workWithUsReducer;
