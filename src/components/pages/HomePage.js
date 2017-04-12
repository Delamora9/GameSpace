import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
//import SearchPage from './pages/SearchPage.js';


export default class HomePage extends React.Component {
  render() {
    document.addEventListener('DOMContentLoaded', function() {
      let searchBar = document.getElementById("searchBar");
      let searchButton = document.getElementById("searchButton")
      searchButton.addEventListener('click', newQuery, false)
    }, false);

    //load the results page with the user's seach input
    function newQuery() {
      let searchValue = searchBar.value;
      if (searchValue) {
        let newPath = "/#/results/?search=" + searchValue;
        browserHistory.push(newPath);
      }
    }

    return(
      <div>
      {this.props.children}
        <div>
          <h1>Search</h1>
          <form>
            <label htmlFor="search">Search a user or game:</label><br />
            <input id="searchBar" type="text" />
            <button id="searchButton" type="Submit">Submit</button>
          </form>
          <span id="searchResults">No results were found.</span>
        </div>
        </div>
    );
  }
}
