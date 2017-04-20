import React from 'react';
import { hashHistory } from 'react-router';

export default class SearchPage extends React.Component {
  render() {
    

    return(
      <div>
        <h1>Search</h1>
        <form>
          <label htmlFor="search">Search a user or game:</label><br />
          <input id="searchBar" type="text" />
          <button id="searchButton" type="Submit">Submit</button>
        </form>
        <span id="searchResults">No results were found.</span>
      </div>
    );
  }

  componentDidMount() {
    console.log("Component Mounted!");

    //get the query value of 'search' from the url
    const { query } = this.props.location;
    const { search } = query;
    console.log(search);

    //capture DOM elements
    let searchResults = document.getElementById("searchResults");
    let searchBar = document.getElementById("searchBar");
    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', newQuery, false);

    //gather results form Steam API and load it onto the page
    function displayResults() {
      console.log("displayResults(): ", search);
      if (search) {
        //reset search bar value
        searchBar.value = search;
        searchResults.innerHTML = "You searched: " + search;
      }
    }

    //reload the page with new search query
    function newQuery() {
      console.log("newQuery()");
      let searchValue = searchBar.value;
      if (searchValue) {
        let newPath = "/results/?search=" + searchValue;
        hashHistory.push(newPath);
        displayResults();
      }
    }

    //initial query
    displayResults();
  }

}
