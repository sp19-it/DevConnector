import React from 'react';
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

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Navbar />
        <Route exact path="/" component={ Landing }/>
        <Route exact path="/register" component={ Register }/>
        <Route exact path="/login" component={ Login }/>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
