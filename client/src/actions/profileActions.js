import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, GET_ERRORS, SET_CURRENT_USER } from '../actions/types';

// get all Profiles
export const getProfiles = () => dispatch => {
  axios
  .get('/api/profiles/all')
  .then(res => dispatch({
    type: GET_PROFILES,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// get current user's profile
export const getCurrentProfile = () => dispatch => {
  axios
  .get('/api/profiles')
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_PROFILE,
    payload: null
  }))
}

// get Profile by Handle
export const getProfileByHandle = handle => dispatch => {
  axios
  .get(`/api/profiles/handle/${handle}`)
  .then(res => dispatch({
    type: GET_PROFILE,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_PROFILE,
    payload: null
  }))
}

// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
  .post('/api/profiles', profileData)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

// add Experience 
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profiles/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profiles/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete account
export const deleteAccount = () => dispatch => {
  if (window.confirm('This cannot be undone!')) {
    axios
      .delete('/api/profiles')
      .then(res => dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
  }

}