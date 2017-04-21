import React from 'react';
import { hashHistory } from 'react-router';


export default class SearchPage extends React.Component {
  render() {
    return(
      <div>
        <h1>Search</h1>
        <form>
          <label>Search a user or game:</label><br />
          <span>Game search: </span>
          <input id="gameSearch" name="searchType" type="radio" />
          <br />
          <span id="userSearchLabel">User search: </span>
          <input id="userSearch" name="searchType" type="radio" />
          <br />
          <input id="searchBar" type="text" />
          <button id="searchButton" type="Submit">Submit</button>
        </form>
        <span id="searchResults">No results were found.</span>
      </div>
    );
  }

  componentDidMount() {
    //capture DOM elements
    let searchResults = document.getElementById("searchResults");
    let searchBar = document.getElementById("searchBar");
    let searchButton = document.getElementById("searchButton");
    let userSearch = document.getElementById("userSearch");
    let gameSearch = document.getElementById("gameSearch");
    searchButton.addEventListener('click', newQuery, false);

    //function to update the page with a new search query
    function newQuery() {

      let searchValue = searchBar.value;
      if (searchValue) {
        let newPath = "/results/?search=" + searchValue;
        if(userSearch.checked){
            newPath += "&searchType=User";
            hashHistory.push(newPath);
        }
        else {
          newPath += "&searchType=Game";
          hashHistory.push(newPath);
        }
      }
    }

    //force componentDidUpdate to be called when SearchPage is first mounted
    this.forceUpdate();
  }

  componentDidUpdate() {
    let searchBar = document.getElementById("searchBar");
    let searchResults = document.getElementById("searchResults");
    //set cursor focus to searchBar
    searchBar.focus();

    //get the query value of 'search'
    const { query } = this.props.location;
    const { search } = query;
    const { searchType } = query;

    //update the page to display the query's results
    if (search) {
      //refill search bar value
      searchBar.value = search;
      searchResults.innerHTML = "You searched for " + searchType + ": " + search;
    }
  }

}
