import { ACTIONS_TYPES } from '../constants/constants';

/**
 * @desc initial state which will is pased to reducer.
 * @type {Object} initialState
 */
const initialState = {
  events: []
};

/**
 * @desc reducer function for handling the events
 * @param {Object} state - state
 * @param {Object} action - action with payload and type
 * @return {Object} this function returns new state.
 */
const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_TYPES.INITIAL_DATA:
      return {
        ...state,
        ...{
          events: [...state.events, ...action.payload.events]
        }
      };
    default: return state;
  }
};

export default eventsReducer;
