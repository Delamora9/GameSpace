import React from 'react';
import { hashHistory } from 'react-router';

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

  shouldComponentUpdate(nextProps) {
    let currentUser = this.props.params.user;
    let newUser = nextProps.params.user;
    return !(currentUser == newUser);
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


    // Set loading indicators
    friendsList.innerText = "Loading...";
    gamesPlayedList.innerText = "Loading...";
    gamesOwnedList.innerText = "Loading...";

    // Grab params from the URL
    const { params } = this.props
    let currentPath = this.props.location.pathname;


    fetch('api/http://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=36991C4777F98B19F85825A2368DE13A&vanityurl=' + params.user).then(function(response) {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.status);
          }).then((data)=>{
            if (data.response.success == 1) {
              let userSteamID = data.response.steamid;
              data.steamids = userSteamID;
              fetch('api/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=36991C4777F98B19F85825A2368DE13A&steamids=' + userSteamID).then(function(response) {
                if (response.ok) {
                  return response.json();
                }
                throw new Error(response.status);
              }).then((profileInfo)=>{
                buildUserData(profileInfo.response);
              });

              // Create list of friends
              fetch('api/http://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=36991C4777F98B19F85825A2368DE13A&steamid='+ userSteamID).then(function(response) {
                if (response.ok) {
                  return response.json();
                }
                throw new Error(response.status);
              }).then((friendData)=>{
                friendsTitle.innerHTML = "Friends: (" + friendData.friendslist.friends.length + ")";
                friendsList.innerHTML = "";
                // If the user has friends (or has them publicly available)
                if (friendData != null && friendData.friendslist.friends.length != 0) {
                  let length;
                  // If there are more than 5 friends, only display 5; else display all
                  if (friendData.friendslist.friends.length > 5) { length = 5; }
                  else { length = friendData.friendslist.friends.length; }
                  for (let i = 0; i < length; i++) {
                    fetch('api/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=36991C4777F98B19F85825A2368DE13A&steamids=' + friendData.friendslist.friends[i].steamid).then(function(response) {
                      if (response.ok) {
                        return response.json();
                      }
                      throw new Error(response.status);
                    }).then((friendInfo)=>{
                      buildFriendList(friendData, friendInfo.response);
                    });
                  }
                } else {
                  let friendsli = document.createElement('li');
                  friendsli.innerHTML = 'None Available';
                  friendsList.appendChild(friendsli);
                }
              });

              // Create list of played games
              fetch('api/https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=36991C4777F98B19F85825A2368DE13A&steamid=' + userSteamID +'&count=5').then(function(response) {
                if (response.ok) {
                  return response.json();
                }
                throw new Error(response.status);
              }).then((playedGamesData)=>{
                gamesPlayedList.innerHTML = "";
                if (playedGamesData != null) {
                  gamesPlayedList.innerText = "";
                  buildPlayedGamesList(playedGamesData.response);
                } else {
                  let recentli = document.createElement('li');
                  recentli.innerHTML = 'No Recently Played Games';
                  gamesPlayedList.appendChild(recentli);
                }
              });

              // Create list of owned games
              fetch('api/https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=36991C4777F98B19F85825A2368DE13A&input_json=%7B%22steamid%22%3A%22' + userSteamID +'%22%2C%22include_appinfo%22%3Atrue%2C%22include_played_free_games%22%3Afalse%2C%22appids_filter%22%3A%22%22%7D').then(function(response) {
                if (response.ok) {
                  return response.json();
                }
                throw new Error(response.status);
              }).then((ownedGamesData)=>{
                console.log("Owned games ", ownedGamesData.response);
                gamesOwnedList.innerHTML = "";
                if (ownedGamesData != null) {
                  gamesOwnedList.innerText = "";
                  buildOwnedGamesList(ownedGamesData.response);
                } else {
                  let ownedli = document.createElement('li');
                  ownedli.innerHTML = 'No Owned Games';
                  gamesOwnedList.appendChild(ownedli);
                }
              });
            }

          });

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
      if      (month === 1) { mm = "January"; }
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
      } else {
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
      } else {
        basicInfo.innerHTML +="&nbsp;&nbsp;&nbsp;Never online, apparently.";
      }
    }

    // Takes JSON data from Steam and creates a list of friends
    function buildFriendList(friendData, friendInfo) {
      let friendsli = document.createElement('li');
      let newFriend = "";
      let aTag = document.createElement('a');
      let urlprofile = friendInfo.players[0].profileurl.split('/');
      let regex = new RegExp(/^\d+$/);
      // Check for valid profileurl - better redirect
      if (!regex.test(urlprofile[4])) {
        newFriend = urlprofile[4] + " (profileurl)";
      }
      else {
        newFriend = friendInfo.players[0].personaname + " (persona)";
      }
      // Allow link if profile not private
      if (friendInfo.players[0].realname != null)
      {
        newFriend += " - " + friendInfo.players[0].realname;
        aTag.style.cssText = "text-decoration: underline";
        aTag.addEventListener('click', function() {
          newPath = "/user/" + friendInfo.players[0].personaname;
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
          hashHistory.push(newPath);
        }, false);
        aTag.innerHTML = playedGamesData.games[i].name;
        recentli.appendChild(aTag);
        gamesPlayedList.appendChild(recentli);
      }
    }

    // Takes JSON data from Steam and creates a list of owned games
    function buildOwnedGamesList(ownedGamesData) {
        console.log("In function");
         let numOwned = ownedGamesData.game_count;
         ownedTitle.innerHTML = "Owned: (" + numOwned + ")";
         let ownedDisplayed = numOwned;
         console.log("Owned displayed " + ownedDisplayed);
         if (ownedDisplayed > 5) { ownedDisplayed = 5 }
         console.log("Owned displayed " + ownedDisplayed);
         console.log("Owned games data games list ", ownedGamesData.games);
         for (let i = 0; i < ownedDisplayed; i++) {
           let rand = Math.floor(Math.random() * (numOwned));
           let ownedli = document.createElement('li');
           let aTag = document.createElement('a');
           aTag.style.cssText = "text-decoration: underline";
           aTag.addEventListener('click',  function() {
             newPath = "/game/" + ownedGamesData.games[rand].name;
             hashHistory.push(newPath);
           }, false);
           aTag.innerHTML = ownedGamesData.games[rand].name;
           ownedli.appendChild(aTag);
           gamesOwnedList.appendChild(ownedli);
         }
       }

  }//end componentDidMount
}//end UserProfile
