import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alerts from './components/partials/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <div className="container-fluid p-0">
          <Alerts />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;