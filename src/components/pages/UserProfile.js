import React from 'react';
const Steam = require('steam-webapi');

// Set global Steam API Key
Steam.key = "36991C4777F98B19F85825A2368DE13A";

export default class UserProfile extends React.Component {
  render() {
    return(
      <div>
        <h1>User Profile for {this.props.params.user}</h1>
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
    // Capture DOM elements
    let friendsList = document.getElementById("friends");
    let gamesPlayedList = document.getElementById("gamesPlayed");
    let gamesOwnedList = document.getElementById("gamesOwned");
    let friendsTitle = document.getElementById("friendsTitle");
    let recentTitle = document.getElementById("recentTitle");
    let ownedTitle = document.getElementById("ownedTitle");

    // Grab params from the URL
    const { params } = this.props

    // Connect to Steam and retrieve player information
    Steam.ready(function(err) {
      if (err) return console.log(err);

      let steam = new Steam();

      // Retrieve the steam ID from a steam username/communityID
      steam.resolveVanityURL({vanityurl: params.user}, function(err, data) {
        // data -> { steamid: '76561197968620915', success: 1 }
        if (data.success == 1) {
          let userSteamID = data.steamid;

          // Create list of friends
          steam.getFriendList(data, function (err, friendData) {
            if (friendData != null) {
              // for (let i = 0; i < 5; i++)
              // {
                data.steamids = friendData.friendslist.friends[0].steamid;
                steam.getPlayerSummaries(data, function(err, friendInfo) {
                  // userFriends["friend"+0] = friendInfo;
                  buildFriendList(friendData, friendInfo);
                });
              // }

            } else {
              let friendsli = document.createElement('li');
              friendsli.innerHTML = 'None Available';
              friendsList.appendChild(friendsli);
            }
          });



          // Create list of played games
          data.count = 5;
          steam.getRecentlyPlayedGames(data, function(err, playedGamesData) {
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

    // Takes JSON data from Steam and creates a list of friends
    function buildFriendList(friendData, friendInfo) {
      // let numFriends = friendData.friendslist.friends.length;
      friendsTitle.innerHTML = "Friends: (" + friendData.friendslist.friends.length + ")";
      // let displayedFriends = numFriends;
      // if (numFriends > 5) { displayedFriends = 5 }
      // for (let i = 0; i < 5; i++) {
        let friendsli = document.createElement('li');
        console.log(friendInfo);
        let newFriend = friendInfo.players[0].personaname;
        console.log(newFriend);
        let aTag = document.createElement('a');
        aTag.setAttribute('href', "/#/user/" + newFriend);
        aTag.setAttribute('onClick', "window.location.reload(true)");
        aTag.innerHTML = newFriend;
        friendsli.appendChild(aTag);
        // API call to get player information

      //  friendsli.innerHTML = newFriend;
        friendsList.appendChild(friendsli);
      // }
    }

    // Takes JSON data from Steam and creates a list of played games
    function buildPlayedGamesList(playedGamesData) {
      let numRecent = playedGamesData.total_count;
      recentTitle.innerHTML = "Recently Played: (" + numRecent + ")";

      let recentDisplayed = numRecent;
      if (recentDisplayed > 5) { recentDisplayed = 5 }

      for (let i = 0; i < recentDisplayed; i++) {
        let recentli = document.createElement('li');
        recentli.innerHTML = playedGamesData.games[i].name;
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
        ownedli.innerHTML = ownedGamesData.games[i].name;
        gamesOwnedList.appendChild(ownedli);
      }
    }

  }//end componentDidMount
}//end UserProfile
