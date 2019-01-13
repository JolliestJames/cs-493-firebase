import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Landing from '../Landing';
import Home from '../Home';

import * as ROUTES from '../../constants/routes'

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr/>

      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.HOME} component={Home} />
    </div>
  </Router>
);

export default App;
