import React from 'react';
const Steam = require('steam-webapi');

// Set global Steam API Key
Steam.key = "36991C4777F98B19F85825A2368DE13A";

export default class GameProfile extends React.Component {
  render() {
    console.log(this.props);
    const {params} = this.props
    Steam.ready(function(err) {
      if (err) return console.log(err);
      else {
        const steam = new Steam();

        //Retrieve list of Apps and their ID
        steam.getAppList({}, function(err, data) {
          //console.log(data);
          let gameList = data['applist']['apps'];
          let gameID;
          for (let i = 0; i < gameList.length; i++) {
            if (gameList[i].name == params.game) {
              gameID = gameList[i].appid;
            }
          }
          //console.log(gameID);

          //Retrieve recent news for specific game
          steam.getNewsForApp({appid: gameID, count: 5}, function(err, data){
            //console.log(data);
          });
        });
      }
    });

    return(
      <div>
        <h1>Game Profile for {params.game}</h1>
        <div id="divbody">

        </div>
      </div>
    );
  }
}
