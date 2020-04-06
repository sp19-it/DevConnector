import { GET_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      // don't need to keep the diff of states so don't use spread operator 
      return action.payload;
    
    default:
      return state;
  }
};