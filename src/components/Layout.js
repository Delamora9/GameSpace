import React from 'react';
import { Link } from 'react-router';
import SearchPage from './pages/SearchPage.js';


export default class HomePage extends React.Component {
  render() {
    return(
        <div id="header">
          <header>
          <h1 id="title">GameSpace</h1>
            <ul id="navbar">
              <li><Link to="/">Home</Link></li>
              <li><Link to="user/Topher">User Profile</Link></li>
              <li><Link to="game/Overwatch">Game Profile</Link></li>
            </ul>
            </header>
            <div id="bodymain">
              {this.props.children}
            </div>
        </div>
    );
  }
}
