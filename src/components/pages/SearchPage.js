import React from 'react';
import { browserHistory } from 'react-router';

export default class SearchPage extends React.Component {
  render() {
    //get the query value of 'search' from the url
    const { query } = this.props.location;
    const { search } = query;

    document.addEventListener('DOMContentLoaded', function() {
      let searchResults = document.getElementById("searchResults");
      let searchBar = document.getElementById("searchBar");
      let searchButton = document.getElementById("searchButton");
      let resultul = document.getElementById("returnResults");
      console.log(resultul);
      searchButton.addEventListener('click', queryResults, false);
      queryResults();
    }, false);

    var Steam = require('steam-webapi');

    // Set global Steam API Key
    Steam.key = "36991C4777F98B19F85825A2368DE13A";


    //gather results form Steam API and load it onto the page
    function queryResults() {
      if (search) {
        console.log("querying....");
        searchResults.innerHTML = "You searched: " + search;
        newQuery(search);
      }
    }

    //reload the page with new search query
    function newQuery(search) {
      //let searchValue = searchBar.value;
      //if (searchValue) {
        console.log("about to call steam");
        Steam.ready(function(err) {
            if (err) return console.log(err);

            var steam = new Steam();

            // Retrieve the steam ID from a steam username/communityID
            steam.resolveVanityURL({vanityurl: search}, function(err, data) {
                console.log(data);
                // data -> { steamid: '76561197968620915', success: 1 }

              // Get the Player's TF2 Backpack items
              // data.gameid = Steam.TF2;
              //
              // // getPlayerItems requires { gameid, steamid }
              // steam.getPlayerItems(data, function (err, data) {
              //     console.log(data);
                  // data -> { status: 1, num_backpack_slots: 1100, items: [...], ...}
              //
              // });
          });

        });

        var resultli = document.createElement('li');
        var aTag = document.createElement('a');
        aTag.setAttribute('href', "/#/user/" + search);
        aTag.innerHTML = search;
        resultli.appendChild(aTag);
        document.getElementById("returnResults").appendChild(resultli);

        let newPath = "/#/results/?search=" + search;
        browserHistory.push(newPath);
      }
    //}

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
}
