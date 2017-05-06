import React from 'react';
import { hashHistory } from 'react-router';
const Steam = require('steam-webapi');

// Set global Steam API Key
Steam.key = "36991C4777F98B19F85825A2368DE13A";

export default class GameProfile extends React.Component {
  render() {
    return(
      <div>
        <h1 id="gameTitle">Game Profile</h1>
        <div id="divbody">
          <h3>Game News:</h3>
          <ul id="game-news">
          </ul>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps) {
    let currentGame = this.props.params.game;
    let newGame = nextProps.params.game;
    console.log(currentGame, newGame);
    console.log(currentGame == newGame);
    return !(currentGame == newGame);
  }

  componentDidUpdate() {
    // Capture DOM elements
    let gameTitle = document.getElementById('gameTitle');
    let gameNews = document.getElementById('game-news');

    // Initialize the game profile page
    gameTitle.innerText = "Searching...";
    gameNews.innerHTML = "";

    // Grab params from the URL
    const { params } = this.props
    let currentPath = this.props.location.pathname;

    // Connect to Steam and retrieve game information
    Steam.ready(function(err) {
      if (err) return console.log(err);
      else {
        const steam = new Steam();

        // Retrieve list of Apps and their ID
        steam.getAppList({}, function(err, data) {
          // Get list of games
          let gameList = data.applist.apps;
          let gameID;

          // Find the gameID    ****This is slow, any way to speed it up?****
          for (let i = 0; i < gameList.length; i++) {
            if (gameList[i].name === params.game) {
              gameID = gameList[i].appid;
            }
          }

          // Create list of game news
          if (gameID != null) {
            gameTitle.innerText = "Game Profile for " + params.game;
            gameNews.innerHTML = "Loading";
            steam.getNewsForApp({appid: gameID, count: 5}, function(err, newsData) {
              buildGameNewsList(newsData);
            });
          } else {
            // If the gameID didn't match anything in the Steam DataBase
            let errorRedirect = currentPath + "/notfound";
            hashHistory.replace(errorRedirect);
          }
        });
      }
    });//end Steam call

    // Takes JSON data from Steam and creates a list of game news
    function buildGameNewsList(newsData) {
      //console.log(newsData);
      let newsItems = newsData.appnews.newsitems;

      if (newsData != null && newsData != undefined) {
        gameNews.innerHTML = "";
        for (let i = 0; i < newsItems.length; i++) {
          let newsLi = document.createElement('li');
          newsLi.innerHTML = newsItems[i]['title'] + '<br>' + newsItems[i]['contents'];
          gameNews.appendChild(newsLi);
        }
      } else { gameNews.innerHTML = 'No news'; }
    }
    
  }//end componentDidUpdate
}//end GameProfile
