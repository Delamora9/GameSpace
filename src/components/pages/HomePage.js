import React from 'react';
import { Link } from 'react-router';
import { hashHistory } from 'react-router';

fetch('api/http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=36991C4777F98B19F85825A2368DE13A&vanityurl=iamthewalrus').then(function(response) {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.status);
}).then((data)=>{
  console.log("Fetch data ", data.response);
});

export default class HomePage extends React.Component {
  render() {
    return(
      <div>
        <h1>Search</h1>
        <form>
          <h4>Search a user or game (case-sensitive)</h4>
          <span>Game search: </span>
          <input id="gameSearch" type="checkbox" defaultChecked />
          <span>User search: </span>
          <input id="userSearch" type="checkbox" defaultChecked />
          <br />
          <input id="searchBar" type="text" />
          <button id="searchButton">Submit</button>
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
  }//end componentDidMount

}//end HomePage
