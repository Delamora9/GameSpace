import React from 'react';

export default class UserProfile extends React.Component {
  render() {
    console.log(this.props);
    const {params} = this.props
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
