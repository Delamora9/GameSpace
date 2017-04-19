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
            console.log(data);
            // data -> { steamid: '76561197968620915', success: 1 }

          // Get the Player's TF2 Backpack items
          data.gameid = Steam.TF2;

          // getPlayerItems requires { gameid, steamid }
          steam.getPlayerItems(data, function (err, data) {
              console.log(data);
            });
        });

      });
    return(
      <div>
        <h1>User Profile for {params.user}</h1>
        <div id="divbody">
          <p>data</p>
        </div>
      </div>
    );
  }
}
