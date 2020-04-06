// write anything related to the authentication into the store (give a specific responsibility)

import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validations/is-empty';


// 1. WHAT part (data)
const initialState = {
  isAuthenticated: false,
  user: {}
}

// 2. HOW part (function)
// App.js wakes up reducer with default state/action
// function returns to the store
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    
    default:
      return state;
  }
};