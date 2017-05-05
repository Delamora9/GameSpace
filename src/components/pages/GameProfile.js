import React from 'react';
const Steam = require('steam-webapi');

// Set global Steam API Key
Steam.key = "36991C4777F98B19F85825A2368DE13A";

export default class GameProfile extends React.Component {
  render() {
    return(
      <div>
        <h1>Game Profile for {this.props.params.game}</h1>
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
    // Capture DOM elements
    let gameNews = document.getElementById('game-news');
    let achievments = document.getElementById('achievements');

    // Grab params from the URL
    const { params } = this.props

    // Connect to Steam and retrieve player information
    Steam.ready(function(err) {
      if (err) return console.log(err);
      else {

        const steam = new Steam();

        // Retrieve list of Apps and their ID
        steam.getAppList({}, function(err, data) {
          //console.log(data);
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
            steam.getGlobalAchievementPercentagesForApp({gameid: gameID}, function(err, achievementData) {
              buildAchievementList(achievementData);
            });
            steam.getNewsForApp({appid: gameID, count: 5}, function(err, newsData) {
              buildGameNewsList(newsData);
            });
          } else {
            gameNews.innerHTML = 'Unable to find the game matching your request';
          }
        });
      }
    });//end Steam call

    // Takes JSON data from Steam and creates an achievment div
    function buildAchievementList(achievementData) {
      //console.log(achievementData);
      let achievementItems = achievementData.achievementpercentages.achievements;

      if (achievementData != null && achievementData != undefined && achievementItems.length > 0) {
        for (let i = 0; i < achievementItems.length; i++) {
          let achievementLi = document.createElement('li');
          let achievementName = achievementItems[i]['name'].replace(/_/g, ' '); //strip underscores from name
          achievementLi.innerHTML =  achievementName + ' - ' + Math.round(achievementItems[i]['percent']) + '% of people have this Achievement';
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
      //console.log(newsData);
      let newsItems = newsData.appnews.newsitems;

      if (newsData != null && newsData != undefined) {
        for (let i = 0; i < newsItems.length; i++) {
          let newsLi = document.createElement('li');
          newsLi.innerHTML = newsItems[i]['title'] + '<br>' + newsItems[i]['contents'];
          gameNews.appendChild(newsLi);
        }
      } else { gameNews.innerHTML = 'No news to show.'; }
    }

  }//end componentDidMount
}//end GameProfile
