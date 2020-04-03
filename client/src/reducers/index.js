// index.js gets called by default
// combine all reducers here

import { combineReducers } from 'redux';
import authReducer from './authReducer';

// combineReducers will make an array of all reducers
export default combineReducers({
  auth: authReducer
})