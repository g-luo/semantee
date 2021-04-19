import React, { lazy, Suspense } from 'react';
import { Switch, Route, RouteProps, Redirect } from 'react-router-dom';

import Home from '../views/Home';
import Demo from '../views/Demo';

const routes: Array<RouteProps> = [
  { path: '/home', component: Home },
  { path: '/demo', component: Demo, exact: false },
];

const Routes: React.FC = () => (

    <Switch>
      <Redirect from="/" to="/home" exact />
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact ?? true} // force exact=true unless specified false
          sensitive
        />
      ))}
      {/* 404 page if nothing matches */}
      <Route component={Home} />
    </Switch>
);

export default Routes;
