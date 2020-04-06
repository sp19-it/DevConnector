import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // write token to Authorization Header and apply token to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete token from Authorization Header
    delete axios.defaults.headers.common['Authorization']
  }
};

export default setAuthToken;