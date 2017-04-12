import React from 'react';

export default class SearchPage extends React.Component {
  render() {
    return(
      <div>
        <h1>Search</h1>
        <form>
          <label htmlFor="search">Search a user or game:</label><br />
          <input id="search" type="text" />
          <button type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}
