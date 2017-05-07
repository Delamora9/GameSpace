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

  shouldComponentUpdate(nextProps) {
    let currentSearch = this.props.location.query.search;
    let currentType = this.props.location.query.searchType;
    let newSearch = nextProps.location.query.search;
    let newType = nextProps.location.query.searchType;
    return !(currentSearch == newSearch && currentType == newType);
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

      // Refill search components
      searchBar.value = search;
      searchBar.focus();

      // Call proper searches and recheck boxes
      if (searchType == "Both") {
        gameSearch.checked = true;
        userSearch.checked = true;
        searchForGames(search);
        searchForUsers(search);
      } else if (searchType == "Game") {
        gameSearch.checked = true;
        searchForGames(search);
      } else if (searchType == "User") {
        userSearch.checked = true;
        searchForUsers(search);
      }
    }

    // Search the Steam API for matching games
    function searchForGames(search) {
      searchResults.innerHTML = "Loading...";
      fetch('api/http://api.steampowered.com/ISteamApps/GetAppList/v2').then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      }).then((data)=>{
        displayGameResults(data, search);
      });
    }

    // Search the Steam API for matching users
    function searchForUsers(search) {
      searchResults.innerHTML = "Loading...";
      fetch('api/http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=36991C4777F98B19F85825A2368DE13A&vanityurl=' + search).then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      }).then((data)=>{
        displayUserResults(data.response, search);
      });
    }

    // Takes JSON data containing list of games from Steam. Cross references with search and displays result
    function displayGameResults(data, search) {
      let gameList = data.applist.apps;
      let gameID;
      // Find the gameID
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
    }

    // Takes JSON data from user search on Steam and displays the result
    function displayUserResults(data, search) {
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
    }

  }//end componentDidUpdate

}//end SearchPage
