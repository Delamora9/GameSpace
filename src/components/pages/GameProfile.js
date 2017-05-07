import React from 'react';
import { hashHistory } from 'react-router';

export default class GameProfile extends React.Component {
  render() {
    return(
      <div>
        <h1 id="gameTitle">Game Profile</h1>
        <div id="divbody">
          <h3>Achievements:</h3>
          <ul id="achievements">
          </ul>
        </div>
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
    let achievments = document.getElementById('achievements');

    // Initialize the game profile page
    gameTitle.innerText = "Searching...";
    gameNews.innerHTML = "";

    // Grab params from the URL
    const { params } = this.props
    let currentPath = this.props.location.pathname;

    fetch('api/http://api.steampowered.com/ISteamApps/GetAppList/v2').then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    }).then((data)=>{
      let gameList = data.applist.apps;
      let gameID;

      // Find the gameID    ****This is slow, any way to speed it up?****
      for (let i = 0; i < gameList.length; i++) {
        if (gameList[i].name === params.game) {
          gameID = gameList[i].appid;
        }
      }

      // Call Steam API for game content using the gameID
      if (gameID != null) {

        gameTitle.innerText = "Game Profile for " + params.game;
        gameNews.innerHTML = "Loading";

        fetch('api/http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002?gameid=' + gameID).then(function(response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.status);
        }).then((achievementData)=>{
          buildAchievementList(achievementData)
        });

        fetch('api/http://api.steampowered.com/ISteamNews/GetNewsForApp/v2?appid='+ gameID + '&count=5').then(function(response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.status);
        }).then((newsData)=>{
          buildGameNewsList(newsData);
        });
      } else {

        // If the gameID didn't match anything in the Steam DataBase
        let errorRedirect = currentPath + "/notfound";
        hashHistory.replace(errorRedirect);

        gameNews.innerHTML = 'Unable to find the game matching your request';

      }
  });


    // Takes JSON data from Steam and creates an achievment div
    function buildAchievementList(achievementData) {
      //console.log(achievementData);
      let achievementItems = achievementData.achievementpercentages.achievements;

      if (achievementData != null && achievementData != undefined) {
        for (let i = 0; i < achievementItems.length; i++) {
          let achievementLi = document.createElement('li');
          let achievementName = achievementItems[i]['name'].replace(/_/g, ' '); //strip underscores from name
          achievementLi.innerHTML =  achievementName + ' - ' + Math.round(achievementItems[i]['percent']) + '% of people have this Achievement';
          achievements.appendChild(achievementLi);
        }
      } else { achievements.innerHTML = 'No achievements to show.'; }
    }

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
      } else { gameNews.innerHTML = 'No news to show.'; }
    }

  }//end componentDidUpdate



}//end GameProfile
