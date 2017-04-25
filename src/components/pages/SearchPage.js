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
        <ul id="returnResults"></ul>
      </div>
    );
 }

  componentDidMount() {
    // Capture DOM elements
    let searchBar = document.getElementById("searchBar");
    let searchButton = document.getElementById("searchButton");
    if(searchButton){
        searchButton.addEventListener('click', newQuery, false);
    }

    // Function to update the page with a new search query
    function newQuery() {
      let searchValue = searchBar.value;
      if (searchValue) {
        let newPath = "/results/?search=" + searchValue;
        var Steam = require('steam-webapi');
        hashHistory.push(newPath);
      }
    }

    // Force componentDidUpdate to be called when SearchPage is first mounted
    this.forceUpdate();
  }

  componentDidUpdate() {
    // Capture DOM elements
    let searchResults = document.getElementById("returnResults");

    // Get search value from URL query and search Steam
    if(this.props.location){
      let { query } = this.props.location;
      let { search } = query;

      if (search) {
        searchBar.value = search;
        searchBar.focus();
        searchSteam(search);
      }
    }
  
    // Display result from Steam API
    function searchSteam(search) {
      searchResults.innerHTML = "Loading...";

      let Steam = require('steam-webapi');
      Steam.key = "36991C4777F98B19F85825A2368DE13A";

      // Update the page to display the query's results  
      Steam.ready(function(err) {
        if (err) return console.log(err);

        let steam = new Steam();

        // Retrieve the steam ID from a steam username/communityID
        steam.resolveVanityURL({vanityurl: search}, function(err, data) {
          // Display results
          if (data.success == 1) {
            let resultli = document.createElement('li');
            let aTag = document.createElement('a');
            aTag.setAttribute('href', "/#/user/" + search);
            aTag.innerHTML = search;
            resultli.appendChild(aTag);
            searchResults.innerText = "";
            searchResults.appendChild(resultli);
          } else { searchResults.innerHTML = data.message; }
        });
      });
    }

  }//end componentDidUpdate

}//end SearchPage
