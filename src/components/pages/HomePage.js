import React from 'react';
import { Link } from 'react-router';


export default class HomePage extends React.Component {
  render() {
    return(
      <div>
        <h1>Nav Bar Here</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="user/Topher">User Profile</Link></li>
          <li><Link to="game/Overwatch">Game Profile</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}
