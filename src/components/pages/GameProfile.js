import React from 'react';

export default class GameProfile extends React.Component {
  render() {
    console.log(this.props);
    const {params} = this.props
    return(
      <div>
        <h1>Game Profile for {params.game}</h1>
        <div id="divbody">
          <p>data</p>
        </div>
      </div>
    );
  }
}
