import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, GET_ERRORS } from '../actions/types';

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