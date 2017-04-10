import React from 'react';
import ReactDOM from 'react-dom';
//import { createHistory } from 'history';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import { RouterToUrlQuery } from 'react-url-query';

//import page modules for routing
import HomePage from './components/pages/HomePage.js';
import UserProfile from './components/pages/UserProfile.js';
import GameProfile from './components/pages/GameProfile.js';
import SearchPage from './components/pages/SearchPage.js';
import ErrorPage from './components/pages/ErrorPage.js';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={HomePage}>
      <RouterToUrlQuery>
        <IndexRoute component={SearchPage}></IndexRoute>
      </RouterToUrlQuery>
      <Route path="user/:user" component={UserProfile}></Route>
      <Route path="game/:game" component={GameProfile}></Route>
    </Route>
    <Route path="*" component={ErrorPage}></Route>
  </Router>,
app);
