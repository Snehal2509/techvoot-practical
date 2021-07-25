import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import StatuView from "./components/statuView";
import List from "./components/list";

function App() {
  return (<Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/unapproved" component={StatuView} />
            <Route path="/approved" component={StatuView} />
            <Route path="/list" component={List} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;