import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

//import page modules for routing
import Layout from './components/Layout.js';
import HomePage from './components/pages/HomePage.js';
import UserProfile from './components/pages/UserProfile.js';
import GameProfile from './components/pages/GameProfile.js';
import SearchPage from './components/pages/SearchPage.js';
import ErrorPage from './components/pages/ErrorPage.js';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage}></IndexRoute>
      <Route path="results/" component={SearchPage}></Route>
      <Route path="user/:user" component={UserProfile}></Route>
      <Route path="game/:game" component={GameProfile}></Route>
      <Route path="error" component={ErrorPage}></Route>
    </Route>
    <Route path="*" component={ErrorPage}></Route>
  </Router>,
app);
