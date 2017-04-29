import React from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';


export default class HomePage extends React.Component {
  render() {
    return(
      <div>
        <h1>Search</h1>
        <form>
          <label>Search a user or game:</label><br />
          <span>Game search: </span>
          <input id="gameSearch" name="searchType" type="radio" /><br />
          <span id="userSearchLabel">User search: </span>
          <input id="userSearch" name="searchType" type="radio" /><br />
          <input id="searchBar" type="text" />
          <button id="searchButton" type="Submit">Submit</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    //capture DOM elements
    let searchBar = document.getElementById("searchBar");
    let searchButton = document.getElementById("searchButton");
    let userSearch = document.getElementById("userSearch");
    let gameSearch = document.getElementById("gameSearch");
    searchButton.addEventListener('click', newQuery, false);

    //load SearchPage with the user's search input
    function newQuery() {
      let searchValue = searchBar.value;
      if (searchValue) {
        let newPath = "/results/?search=" + searchValue;
        if (userSearch.checked) {
          newPath += "&searchType=User";
          hashHistory.push(newPath);
        }
        else {
          newPath += "&searchType=Game";
          hashHistory.push(newPath);
        }
      }
    }
  }

}
