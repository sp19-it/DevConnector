import { SET_CURRENT_USER, GET_ERRORS } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Action Creator "registerUser"
export const registerUser = (userData, history) => dispatch => {
  axios
  .post('/api/users/register', userData)
  // history: browser history -> forwards to login page
  .then(res => history.push('/login') )
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

// Action Creator: "loginUser"
export const loginUser = userData => dispatch => {
  axios
  .post('/api/users/login', userData)
  .then(res => {
    const token = res.data.token;
    // 1. save token to localstorage(save in the browser session)
    localStorage.setItem('jwtToken', token);

    // 2. attach token on "Authentication header" for every axios request
    setAuthToken(token);

    // 3. decode token 
    const decoded = jwt_decode(token);

    // 4. dispatch "SET_CURRENT_USER" action
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

// Action Creator: "logoutUser"
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};