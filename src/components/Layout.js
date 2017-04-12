import React from 'react';
import { Link } from 'react-router';
import SearchPage from './pages/SearchPage.js';


export default class HomePage extends React.Component {
  render() {
    return(
        <div>
          <header>
          <h1>GameSpace</h1>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="user/Topher">User Profile</Link></li>
              <li><Link to="game/Overwatch">Game Profile</Link></li>
            </ul>
            </header>
          {this.props.children}
        </div>
    );
  }
}
