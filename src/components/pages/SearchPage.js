import React from 'react';
import { hashHistory } from 'react-router';


export default class SearchPage extends React.Component {
  render() {

    document.addEventListener('DOMContentLoaded', function() {
      let searchResults = document.getElementById("searchResults");
      let searchBar = document.getElementById("searchBar");
      let searchButton = document.getElementById("searchButton");
      let resultul = document.getElementById("returnResults");
      console.log(resultul);
    }, false);

    return(
      <div>
        <h1>Search</h1>
        <form>
          <label htmlFor="search">Search a user or game:</label><br />
          <input id="searchBar" type="text" />
          <button id="searchButton" type="Submit">Submit</button>
        </form>
        <span id="searchResults">
          No results were found.
        </span>
        <ul id="returnResults"></ul>
      </div>
    );
 }


  componentDidMount() {
    //capture DOM elements
    let searchResults = document.getElementById("searchResults");
    let searchBar = document.getElementById("searchBar");
    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('click', newQuery, false);

    //function to update the page with a new search query
    function newQuery() {
      let searchValue = searchBar.value;
      if (searchValue) {
        let newPath = "/results/?search=" + searchValue;
        var Steam = require('steam-webapi');
        hashHistory.push(newPath);
      }
    }
    //force componentDidUpdate to be called when SearchPage is first mounted
    //this.forceUpdate();
    // JLG commented out due to double calling of componentDidUpdate()
    // and double of API calls
  }

  componentDidUpdate() {
    //set cursor focus to searchBar
    searchBar.focus();

    //get the query value of 'search'
    const { query } = this.props.location;
    const { search } = query;

    var Steam = require('steam-webapi');

    Steam.key = "36991C4777F98B19F85825A2368DE13A";

    //update the page to display the query's results
    if (search) {
      //refill search bar value
      searchBar.value = search;
      searchResults.innerHTML = "You searched: " + search;

      console.log("about to call steam");
      Steam.ready(function(err) {
          if (err) return console.log(err);

          var steam = new Steam();

          // Retrieve the steam ID from a steam username/communityID
          steam.resolveVanityURL({vanityurl: search}, function(err, data) {
              console.log(data);
              });

        });
      var resultli = document.createElement('li');
      var aTag = document.createElement('a');
      aTag.setAttribute('href', "/#/user/" + search);
      aTag.innerHTML = search;
      resultli.appendChild(aTag);
      document.getElementById("returnResults").appendChild(resultli);
    }
  }
}
