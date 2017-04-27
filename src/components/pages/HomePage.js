import React from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';


export default class HomePage extends React.Component {
  render() {
    return(
      <div>
        <h1>Search</h1>
        <form>
          <label htmlFor="search">Search a user or game:</label><br />
          <label htmlFor="gameSearch">Game search:</label>
          <input id="gameSearch" name="searchType" type="radio" />
          <br />
          <label htmlFor="userSearch">User search:</label>
          <input id="userSearch" name="searchType" type="radio" />
          <br />
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
    if(searchButton){
        searchButton.addEventListener('click', newQuery, false);
    }

    //load SearchPage with the user's search input
    function newQuery(e) {
      if(!userSearch.checked && !gameSearch.checked){
        e.preventDefault();
        alert("Please select user or game filter");
      }
      else{
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
    }
  }
}
