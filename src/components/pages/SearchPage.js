import React from 'react';
import { hashHistory } from 'react-router';


export default class SearchPage extends React.Component {
  render() {
    return(
      <div>
        <h1>Search</h1>
        <form>
          <h4>Search a user or game (case-sensitive)</h4>
          <span>Game search: </span>
          <input id="gameSearch" type="checkbox" />
          <span>User search: </span>
          <input id="userSearch" type="checkbox" />
          <br />
          <input id="searchBar" type="text" />
          <button id="searchButton">Submit</button>
        </form>
        <ul id="returnResults"></ul>
      </div>
    );
 }

  componentDidMount() {
    // Capture DOM elements
    let searchBar = document.getElementById("searchBar");
    let searchButton = document.getElementById("searchButton");
    let userSearch = document.getElementById("userSearch");
    let gameSearch = document.getElementById("gameSearch");
    if(searchButton){
        searchButton.addEventListener('click', newQuery, false);
    }

    // Function to update the page with a new search query
    function newQuery(e) {
      e.preventDefault();
      let searchValue = searchBar.value;
      if (searchValue != "") {
        let newPath = "/results/?search=" + searchValue;
        if (userSearch.checked && !gameSearch.checked) {
          newPath += "&searchType=User";
          hashHistory.push(newPath);
        }
        else if (gameSearch.checked && !userSearch.checked) {
          newPath += "&searchType=Game";
          hashHistory.push(newPath);
        }
        else if (gameSearch.checked && userSearch.checked) {
          newPath += "&searchType=Both";
          hashHistory.push(newPath);
        }
        else {
          alert("Please select one or both options");
        }
      }
    }

    // Force componentDidUpdate to be called when SearchPage is first mounted
    this.forceUpdate();
  }

  componentDidUpdate() {
    // Capture DOM elements
    let searchResults = document.getElementById("returnResults");
    let gameSearch = document.getElementById("gameSearch");
    let userSearch = document.getElementById("userSearch");

    // Get search value from URL query and search Steam
    if(this.props.location){
      let { query } = this.props.location;
      let { search } = query;
      let { searchType } = query;

      // Refil search components
      if (searchType == "Both") {
        gameSearch.checked = true;
        userSearch.checked = true;
      } else if (searchType == "Game") { 
        gameSearch.checked = true; 
      } else if (searchType == "User") {
        userSearch.checked = true;
      }
      searchBar.value = search;
      searchBar.focus();

      searchSteam(search, searchType);
    }

    // Display result from Steam API
    function searchSteam(search, searchType) {
      searchResults.innerHTML = "Loading...";

      let Steam = require('steam-webapi');
      Steam.key = "36991C4777F98B19F85825A2368DE13A";

      // Update the page to display the query's results
      Steam.ready(function(err) {
        if (err) return console.log(err);

        let steam = new Steam();
        if (searchType == "Game") {
          steam.getAppList({}, function(err, data) {
            //console.log(data);
            let gameList = data.applist.apps;
            let gameID;
            // Find the gameID    ****This is slow, any way to speed it up?****
            for (let i = 0; i < gameList.length; i++) {
              if (gameList[i].name === search) {
                gameID = gameList[i].appid;
              }
            }
            if (gameID != null) {
              let resultli = document.createElement('li');
              let aTag = document.createElement('a');
              aTag.setAttribute('href', "/#/game/" + search);
              aTag.innerHTML = search + " (game)";
              resultli.appendChild(aTag);
              if (searchResults.innerText == "Loading..." || searchResults.innerText == aTag.innerHTML) {
                searchResults.innerText = "";
              }
              searchResults.appendChild(resultli);
            }
            else {
              let resultli = document.createElement('li');
              let aTag = document.createElement('a');
              aTag.innerHTML = "No Games found";
              resultli.appendChild(aTag);
              if (searchResults.innerText == "Loading..." || searchResults.innerText == aTag.innerHTML) {
                searchResults.innerText = "";
              }
              searchResults.appendChild(resultli);
            }
          });
        }
        else if (searchType == "User") {
          // Retrieve the steam ID from a steam username/communityID
          steam.resolveVanityURL({vanityurl: search}, function(err, data) {
            // Display results
            if (data.success == 1) {
              let resultli = document.createElement('li');
              let aTag = document.createElement('a');
              aTag.setAttribute('href', "/#/user/" + search);
              aTag.innerHTML = search + " (user)";
              resultli.appendChild(aTag);
              if (searchResults.innerText == "Loading..." || searchResults.innerText == aTag.innerHTML) {
                searchResults.innerText = "";
              }
              searchResults.appendChild(resultli);
            } else { searchResults.innerHTML = data.message; }
          });

        }
        else if (searchType == "Both") {
          searchSteam(search, "Game");
          searchSteam(search, "User");
        }
      });
    }

  }//end componentDidUpdate

}//end SearchPage
