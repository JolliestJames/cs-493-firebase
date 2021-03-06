import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Landing from '../Landing';
import Home from '../Home';
import Notes from '../Notes';
import Note from '../Note';
import CreateNote from '../CreateNote';

import * as ROUTES from '../../constants/routes'

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.NOTES} component={Notes} />
      <Route path={ROUTES.CREATE_NOTE} component={CreateNote} />
      <Route path={ROUTES.VIEW_NOTE} component={Note} />
    </div>
  </Router>
);

export default App;
