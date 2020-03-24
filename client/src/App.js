import React from 'react';
import './App.css';

// React ROUTERS
import { BrowserRouter as Router, Route } from 'react-router-dom';

// IMPORT components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Route exact path="/" component={ Landing }/>
      <Route exact path="/register" component={ Register }/>
      <Route exact path="/login" component={ Login }/>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
