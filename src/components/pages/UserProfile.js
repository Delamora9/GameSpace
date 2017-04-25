import React from 'react';
var Steam = require('steam-webapi');

// Set global Steam API Key
Steam.key = "36991C4777F98B19F85825A2368DE13A";

export default class UserProfile extends React.Component {
  render() {
    console.log(this.props);
    const {params} = this.props
    Steam.ready(function(err) {
        if (err) return console.log(err);

        var steam = new Steam();

        // Retrieve the steam ID from a steam username/communityID
        steam.resolveVanityURL({vanityurl: params.user}, function(err, data) {
            // data -> { steamid: '76561197968620915', success: 1 }
            var userSteamID = data['steamid'];

            steam.getFriendList(data, function (err, newdata) {
              if (newdata != null) {
                var numfriends = newdata['friendslist']['friends'].length;
                document.getElementsByTagName("h3")[0].innerHTML = "Friends: (" + numfriends + ")";
                if (numfriends > 5) {
                  for (var i = 0; i < 5; i++) {
                    var friendsli = document.createElement('li');
                    friendsli.innerHTML = 'Steam ID: ' + newdata['friendslist']['friends'][i+1]['steamid'];
                    document.getElementById("friends").appendChild(friendsli);
                  }
                }
                else {
                  for (var i = 0; i < numfriends; i++) {
                    var friendsli = document.createElement('li');
                    friendsli.innerHTML = 'Steam ID: ' + newdata['friendslist']['friends'][i+1]['steamid'];
                    document.getElementById("friends").appendChild(friendsli);
                  }
                }
              }
              else {
                var friendsli = document.createElement('li');
                friendsli.innerHTML = 'None Available';
                document.getElementById("friends").appendChild(friendsli);
              }
            });

            data.count = 5;
            steam.getRecentlyPlayedGames(data, function(err,data) {
              console.log(data);
              if (data != null) {
                var numRecent = data['total_count'];
                console.log(numRecent);
                document.getElementsByTagName("h5")[0].innerHTML = "Recently Played: (" + numRecent + ")";
                if (numRecent > 5) {
                  for (var i = 0; i < 5; i++) {
                    var recentli = document.createElement('li');
                    recentli.innerHTML = data['games'][i]['name'];
                    document.getElementById("games1").appendChild(recentli);
                  }
                }
                else {
                  for (var i = 0; i < numRecent; i++) {
                    var recentli = document.createElement('li');
                    recentli.innerHTML = data['games'][i]['name'];
                    document.getElementById("games1").appendChild(recentli);
                  }
                }
              }
              else {
                var recentli = document.createElement('li');
                recentli.innerHTML = 'None Available';
                document.getElementById("games1").appendChild(recentli);
              }
            });


            data.include_appinfo = true;
            data.include_played_free_games = false;
            data.appids_filter = "";
            steam.getOwnedGames(data, function(err, data) {
              console.log(data);
              if (data != null) {
                var ownedGames = data['game_count'];
                console.log(ownedGames);
                document.getElementsByTagName("h5")[1].innerHTML = "Owned: (" + ownedGames + ")";
                if (ownedGames > 5) {
                  for (var i = 0; i < 5; i++) {
                    var ownedli = document.createElement('li');
                    ownedli.innerHTML = data['games'][i]['name'];
                    document.getElementById("games2").appendChild(ownedli);
                  }
                }
                else {
                  for (var i = 0; i < ownedGames; i++) {
                    var ownedli = document.createElement('li');
                    ownedli.innerHTML = data['games'][i]['name'];
                    document.getElementById("games2").appendChild(ownedli);
                  }
                }
              }
              else {
                var ownedli = document.createElement('li');
                ownedli.innerHTML = 'None Available';
                document.getElementById("games2").appendChild(ownedli);
              }
            })

        });

      });
    return(
      <div>
        <h1>User Profile for {params.user}</h1>
        <div id="divbody">
          <h3>Friends:</h3>
          <ul id="friends">
          </ul>
        </div>
        <div id="divbody">
          <h3>Games:</h3>
          <h5>Recently Played:</h5>
          <ul id="games1">
          </ul>
          <h5>Owned:</h5>
          <ul id="games2">
          </ul>
        </div>
      </div>
    );
  }
}
