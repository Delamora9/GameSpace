import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
//import SearchPage from './pages/SearchPage.js';


export default class HomePage extends React.Component {
  render() {
    document.addEventListener('DOMContentLoaded', function() {
      let searchBar = document.getElementById("searchBar");
      let searchButton = document.getElementById("searchButton")
      searchButton.addEventListener('click', newQuery, false)
    }, false);
    var Steam = require('steam-webapi');

    // Set global Steam API Key
    Steam.key = "36991C4777F98B19F85825A2368DE13A";


    //load the results page with the user's seach input
    function newQuery() {
      let searchValue = searchBar.value;
      if (searchValue) {
        //redirect to searchpage view on input
        let newPath = "/#/results/?search=" + searchValue;
        browserHistory.push(newPath);
      }
    }


    // var request = require('request');

    // var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
    //     'v2/?key=36991C4777F98B19F85825A2368DE13A&appid=8930';

    // request.get(url, function(error, steamHttpResponse, steamHttpBody) {
    //     // Print to console to prove we downloaded the achievements.
    //     console.log(steamHttpBody);
    //     console.log('here');
    // });

    // app.get('/steam/civ5achievements', function(httpRequest, httpResponse) {
    //     // Calculate the Steam API URL we want to use
    //     var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
    //         'v2/?key=36991C4777F98B19F85825A2368DE13A&appid=8930';
    //     request.get(url, function(error, steamHttpResponse, steamHttpBody) {
    //         // Once we get the body of the steamHttpResponse, send it to our client
    //         // as our own httpResponse
    //         httpResponse.setHeader('Content-Type', 'application/json');
    //         httpResponse.send(steamHttpBody);
    //     });
    // });

    // app.use('/', express.static('public'));

    // var bodyParser = require('body-parser');

    // app.use(bodyParser.text());

    // app.post('/frank-blog', function(httpRequest, httpResponse) {
    //     console.log(httpRequest.body);
    //     // We need to respond to the request so the web browser knows
    //     // something happened.
    //     // If you've got nothing better to say, it's considered good practice to
    //     // return the original POST body.
    //     httpResponse.status(200).send('Posted today:\n\n' + httpRequest.body);
    // });

    return(
      <div>
      {this.props.children}
        <div>
          <h1>Search</h1>
          <form>
            <label htmlFor="search">Search a user or game:</label><br />
            <input id="searchBar" type="text" />
            <button id="searchButton" type="Submit">Submit</button>
          </form>
          <span id="searchResults">No results were found.</span>
        </div>
        </div>
    );
  }
}
