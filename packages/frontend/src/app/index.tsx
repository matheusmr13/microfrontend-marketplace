import React from 'react';
import './App.css';
import Application from '../modules/application';
import Microfrontend from '../modules/microfrontend';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './fetch';
import Version from '../modules/version';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Link to="/application">Apps</Link></Route>
        <Route path="/application"><Application /></Route>
        <Route path="/microfrontend"><Microfrontend /></Route>
        <Route path="/version"><Version /></Route>
      </Switch>
    </Router>
  );
}

export default App;
