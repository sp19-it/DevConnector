import { SET_CURRENT_USER, GET_ERRORS } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// "Register user" ACTION
export const registerUser = (userData, history) => dispatch => {
  axios
  .post('/api/users/register', userData)
  // history: browser history,forwarding to login page
  .then(res => history.push('/login') )
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// "Login user"  ACTION : get user token
export const loginUser = userData => dispatch => {
  axios
  .post('/api/users/login', userData)
  .then(res => {
    const token = res.data.token;
    // save token to localstorage(store in browser)

    // set token to axios "Authentication header"
    setAuthToken(token);

    // decode token to get the user 
    const decoded = jwt_decode(token);

    // dispatch "SET_CURRENT_USER"
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    })
  })
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};