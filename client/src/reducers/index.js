// index.js gets called by default
// combine all reducers here

import { combineReducers } from 'redux'
import authReducer from './authReducer'

export default combineReducers({
  auth: authReducer
})