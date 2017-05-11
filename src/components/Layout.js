import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return(
        <div id="header">
          <header>
          <h1 id="title">GameSpace</h1>
            <ul id="navbar">
              <li><Link to="/">Home</Link></li>
              <li><Link to="user/Topher">User Profile</Link></li>
              <li><Link to="game/Counter-Strike">Game Profile</Link></li>
            </ul>
            </header>
            <div id="bodymain">
              {this.props.children}
            </div>
        </div>
    );
  }
}
