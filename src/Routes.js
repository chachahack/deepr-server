import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Eat from './pages/Eat';
import Fun from './pages/Fun';
import Stay from './pages/Stay';
import Emergency from './pages/Emergency';
import Master from './pages/Master';

const AppRoutes = (
  <Route path="/" component={Master}>
    <Route path="eat" component={Eat}/>
    <Route path="fun" component={Fun}/>
    <Route path="stay" component={Stay}/>
    <Route path="emergency" component={Emergency}/>
  </Route>
);

export default AppRoutes;
