// index.js gets called by default
// combine all reducers here

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';

// combineReducers will make an array of all reducers
export default combineReducers({
  auth: authReducer,
  post: postReducer,
  profile: profileReducer,
  errors: errorReducer
})