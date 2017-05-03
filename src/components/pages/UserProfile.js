import React from 'react';
const Steam = require('steam-webapi');
import { hashHistory } from 'react-router';

// Set global Steam API Key
Steam.key = "36991C4777F98B19F85825A2368DE13A";

export default class UserProfile extends React.Component {
  render() {
    return(
      <div>
        <h1>User Profile for {this.props.params.user}</h1>
        <div id="basicInfo">
        </div>
        <div id="divbody">
          <h3 id="friendsTitle">Friends:</h3>
          <ul id="friends">
          </ul>
        </div>
        <div id="divbody">
          <h3>Games:</h3>
          <h5 id="recentTitle">Recently Played:</h5>
          <ul id="gamesPlayed">
          </ul>
          <h5 id="ownedTitle">Owned:</h5>
          <ul id="gamesOwned">
          </ul>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {
    // Capture DOM elements
    let friendsList = document.getElementById("friends");
    let gamesPlayedList = document.getElementById("gamesPlayed");
    let gamesOwnedList = document.getElementById("gamesOwned");
    let friendsTitle = document.getElementById("friendsTitle");
    let recentTitle = document.getElementById("recentTitle");
    let ownedTitle = document.getElementById("ownedTitle");
    let basicInfo = document.getElementById("basicInfo");
    let newPath = "";
    basicInfo.innerHTML = "";


    // Grab params from the URL
    const { params } = this.props
    console.log(this.props.location);
    // Connect to Steam and retrieve player information
    Steam.ready(function(err) {
      if (err) return console.log(err);

      let steam = new Steam();

      // Retrieve the steam ID from a steam username/communityID
      steam.resolveVanityURL({vanityurl: params.user}, function(err, data) {
        // data -> { steamid: '76561197968620915', success: 1 }
        if (data.success == 1) {
          let userSteamID = data.steamid;
          data.steamids = userSteamID;
          steam.getPlayerSummaries(data, function(err, profileInfo) {
            buildUserData(profileInfo);
          });

          // Create list of friends
          steam.getFriendList(data, function (err, friendData) {
            friendsTitle.innerHTML = "Friends: (" + friendData.friendslist.friends.length + ")";
            friendsList.innerHTML = "";
            // If the user has friends (or has them publicly available)
            if (friendData != null && friendData.friendslist.friends.length != 0) {
              let length;
              // If there are more than 5 friends, only display 5; else display all
              if (friendData.friendslist.friends.length > 5) { length = 5; console.log(length); }
              else { length = friendData.friendslist.friends.length; console.log(length); }
              for (let i = 0; i < length; i++)
              {
                data.steamids = friendData.friendslist.friends[i].steamid;
                steam.getPlayerSummaries(data, function(err, friendInfo) {
                  buildFriendList(friendData, friendInfo);
                });
              }

            } else {
              let friendsli = document.createElement('li');
              friendsli.innerHTML = 'None Available';
              friendsList.appendChild(friendsli);
            }
          });

          // Create list of played games
          data.count = 5;
          steam.getRecentlyPlayedGames(data, function(err, playedGamesData) {
            gamesPlayedList.innerHTML = "";
            if (playedGamesData != null) {
              buildPlayedGamesList(playedGamesData);
            } else {
              let recentli = document.createElement('li');
              recentli.innerHTML = 'None Available';
              gamesPlayedList.appendChild(recentli);
            }
          });

          // Create list of owned games
          data.include_appinfo = true;
          data.include_played_free_games = false;
          data.appids_filter = "";
          steam.getOwnedGames(data, function(err, ownedGamesData) {
            gamesOwnedList.innerHTML = "";
            if (ownedGamesData != null) {
              buildOwnedGamesList(ownedGamesData);
            } else {
              let ownedli = document.createElement('li');
              ownedli.innerHTML = 'None Available';
              gamesOwnedList.appendChild(ownedli);
            }
          })
        } else {
          // If the steamid is invalid direct user to ErrorPage
          // Reirect to ErrorPage ************************************************************
        }
      });
    });//end Steam call

    // function to convert unix time to regular(?) time
    function convertTimeStamp(unixTime) {
      let date = new Date(unixTime*1000),
                  yyyy = date.getFullYear(),
                  month = (date.getMonth() + 1),
                  dd = ('0' + date.getDate()).slice(-2),
                  hh = date.getHours(),
                  min = ('0' + date.getMinutes()).slice(-2),
                  time;
      let mm;
      if (month === 1) { mm = "January"; }
      else if (month === 2) { mm = "February"; }
      else if (month === 3) { mm = "March"; }
      else if (month === 4) { mm = "April"; }
      else if (month === 5) { mm = "May"; }
      else if (month === 6) { mm = "June"; }
      else if (month === 7) { mm = "July"; }
      else if (month === 8) { mm = "August"; }
      else if (month === 9) { mm = "September"; }
      else if (month === 10) { mm = "October"; }
      else if (month === 11) { mm = "November"; }
      else { mm = "December"; }
      time = mm + " " + dd + ", " + yyyy + " at " + hh + ":" + min;
      return time;
    }

    function buildUserData(profileInfo) {
      basicInfo.innerHtml = "";
      // Display profile real name
      if (profileInfo.players[0].realname != null) {
        basicInfo.innerHTML += "Name: " + profileInfo.players[0].realname;
      }
      else {
        basicInfo.innerHTML += "Name: Private";
      }

      // Display profile location
      if (profileInfo.players[0].locstatecode != null && profileInfo.players[0].loccountrycode != null) {
        basicInfo.innerHTML += "&nbsp;&nbsp;&nbsp;Location: " + profileInfo.players[0].locstatecode;
        basicInfo.innerHTML += ", " + profileInfo.players[0].loccountrycode;
      }
      else if (profileInfo.players[0].locstatecode == null && profileInfo.players[0].loccountrycode != null) {
        basicInfo.innerHTML += "&nbsp;&nbsp;&nbsp;Location (country): " + profileInfo.players[0].loccountrycode;
      }
      else if (profileInfo.players[0].locstatecode != null && profileInfo.players[0].loccountrycode == null) {
        basicInfo.innerHTML += "&nbsp;&nbsp;&nbsp;Location (state): " + profileInfo.players[0].locstatecode;
      }
      else {
        basicInfo.innerHTML += "&nbsp;&nbsp;&nbspLocation: Unknown";
      }

      // Display profile last online
      if (profileInfo.players[0].lastlogoff != null) {
        basicInfo.innerHTML += "&nbsp;&nbsp;&nbsp;Last Online: " + convertTimeStamp(profileInfo.players[0].lastlogoff);
      }
      else {
        basicInfo.innerHTML +="&nbsp;&nbsp;&nbsp;Never online, apparently.";
      }
    }

    // Takes JSON data from Steam and creates a list of friends
    function buildFriendList(friendData, friendInfo) {
      console.log("building friend stuff");
      let friendsli = document.createElement('li');
      let newFriend = friendInfo.players[0].personaname;
      let aTag = document.createElement('a');
      if (friendInfo.players[0].realname != null)
      {
        newFriend += " - " + friendInfo.players[0].realname;
        aTag.style.cssText = "text-decoration: underline";
        aTag.addEventListener('click', function() {
          newPath = "/user/" + friendInfo.players[0].personaname;
          console.log(newPath);
          hashHistory.push(newPath);
        }, false);
      }
      else {
        newFriend += " - Private";
      }
      aTag.innerHTML = newFriend;
      friendsli.appendChild(aTag);
      friendsList.appendChild(friendsli);
    }

    // Takes JSON data from Steam and creates a list of played games
    function buildPlayedGamesList(playedGamesData) {
      let numRecent = playedGamesData.total_count;
      recentTitle.innerHTML = "Recently Played: (" + numRecent + ")";

      let recentDisplayed = numRecent;
      if (recentDisplayed > 5) { recentDisplayed = 5 }

      for (let i = 0; i < recentDisplayed; i++) {
        let recentli = document.createElement('li');
        let aTag = document.createElement('a');
        aTag.style.cssText = "text-decoration: underline";
        aTag.addEventListener('click', function() {
          newPath = "/game/" + playedGamesData.games[i].name;
          console.log(newPath);
          hashHistory.push(newPath);
        }, false);
        aTag.innerHTML = playedGamesData.games[i].name;
        recentli.appendChild(aTag);
        gamesPlayedList.appendChild(recentli);
      }
    }

    // Takes JSON data from Steam and creates a list of owned games
    function buildOwnedGamesList(ownedGamesData) {
      let numOwned = ownedGamesData.game_count;
      ownedTitle.innerHTML = "Owned: (" + numOwned + ")";
      let ownedDisplayed = numOwned;
      if (ownedDisplayed > 5) { ownedDisplayed = 5 }
      for (let i = 0; i < ownedDisplayed; i++) {
        let ownedli = document.createElement('li');
        let aTag = document.createElement('a');
        aTag.style.cssText = "text-decoration: underline";
        aTag.addEventListener('click',  function() {
          newPath = "/game/" + ownedGamesData.games[i].name;
          console.log(newPath);
          hashHistory.push(newPath);
        }, false);
        aTag.innerHTML = ownedGamesData.games[i].name;
        ownedli.appendChild(aTag);
        gamesOwnedList.appendChild(ownedli);
      }
    }

  }//end componentDidMount
}//end UserProfile
