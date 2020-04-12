import React, { Component } from 'react';
import './App.css';

// React ROUTERS
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Redux STORE, Provider for STORE
import { Provider } from 'react-redux';
import store from './store';

// IMPORT components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';
import { logoutUser } from './actions/authActions';

// when the user comes back to the app (re-open the browser), 1) check if the token is still stored in localStorage 2) check if the token has expired
if (localStorage.jwtToken) {
  // decrypt token
  const decoded = jwt_decode(localStorage.jwtToken);

  // check if token is expired
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime ) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
  
  // save axios Auth Header
  setAuthToken(localStorage.jwtToken);
  
  // dispatch "SET_CURRENT_USER" action
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded
  })
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Footer />
        </Router>
      </Provider>
    )
  }
}

export default App;
