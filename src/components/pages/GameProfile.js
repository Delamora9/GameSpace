import React from 'react';
import { hashHistory } from 'react-router';

export default class GameProfile extends React.Component {
  render() {
    return(
      <div>
        <h1 id="gameTitle">Game Profile</h1>
        <div id="divbody">
          <h3>Achievements:</h3>
          <ul id="achievements"></ul>
        </div>
        <div id="divbody">
          <h3>Game News:</h3>
          <ul id="game-news"></ul>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // Force componentDidUpdate to be called when SearchPage is first mounted
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps) {
    // Only update page for new content
    let currentGame = this.props.params.game;
    let newGame = nextProps.params.game;
    return !(currentGame == newGame);
  }

  componentDidUpdate() {
    // Capture DOM elements
    let gameTitle = document.getElementById('gameTitle');
    let gameNews = document.getElementById('game-news');
    let achievments = document.getElementById('achievements');

    // Initialize the game profile page
    gameTitle.innerText = "Searching...";
    gameNews.innerHTML = "";

    // Grab params from the URL
    const { params } = this.props
    let currentPath = this.props.location.pathname;

    // Steam API call URLs
    let getAppListURL = 'api/http://api.steampowered.com/ISteamApps/GetAppList/v2';
    let getAchievementsURL = 'api/http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002?gameid=';
    let getGameNewsURL = 'api/http://api.steampowered.com/ISteamNews/GetNewsForApp/v2?appid=';

    // Get a list of games from Steam and search for a match
    fetch(getAppListURL).then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    }).then((data) => {
      let gameList = data.applist.apps;
      let gameID;
      // Find the gameID
      for (let i = 0; i < gameList.length; i++) {
        if (gameList[i].name === params.game) {
          gameID = gameList[i].appid;
          break;
        }
      }
      // Call Steam API for game content using the gameID
      if (gameID != null) {
        getGameData(gameID);
      } else {
        // If the gameID didn't match anything in the Steam DataBase
        let errorRedirect = currentPath + "/notfound";
        hashHistory.replace(errorRedirect);
      }
    });

    // Takes a gameID and searches Steam for game's achievements and news
    function getGameData(gameID) {
      gameTitle.innerText = "Game Profile for " + params.game;
      gameNews.innerHTML = "Loading";
      // Search for Achievements
      fetch(getAchievementsURL + gameID).then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      }).then((achievementData) => {
        buildAchievementList(achievementData)
      });
      // Search for Game News
      fetch(getGameNewsURL + gameID + '&count=5').then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      }).then((newsData) => {
        buildGameNewsList(newsData);
      });
    }

    // Takes JSON data from Steam and creates an achievment div
    function buildAchievementList(achievementData) {
      let achievementItems = achievementData.achievementpercentages.achievements;
      if (achievementData != null && achievementData != undefined && achievementItems.length > 0) {
        for (let i = 0; i < achievementItems.length; i++) {
          let achievementLi = document.createElement('li');
          let achievementName = achievementItems[i]['name'].replace(/_/g, ' '); //strip underscores from name
          achievementLi.innerHTML =  achievementName + ' - ' + Math.round(achievementItems[i]['percent']) + '% players have this Achievement';
          achievements.appendChild(achievementLi);
        }
      } else {
        let noAchivementsLi = document.createElement('li');
        noAchivementsLi.innerHTML = 'No achievements to show.';
        achievements.appendChild(noAchivementsLi);
      }
    }

    // Takes JSON data from Steam and creates a list of game news
    function buildGameNewsList(newsData) {
      let newsItems = newsData.appnews.newsitems;
      if (newsData != null && newsData != undefined && newsItems.length > 0) {
        gameNews.innerHTML = "";
        for (let i = 0; i < newsItems.length; i++) {
          let newsLi = document.createElement('li');
          newsLi.innerHTML = newsItems[i]['title'] + '<br>' + newsItems[i]['contents'];
          gameNews.appendChild(newsLi);
        }
      } else { 
        gameNews.innerHTML = 'No news to show.';
      }
    }

  }//end componentDidUpdate

}//end GameProfile
