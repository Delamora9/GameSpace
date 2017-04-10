import React from 'react';
//import pushUrlQuery from 'react-url-query';

export default class SearchPage extends React.Component {
  render() {
    const { query } = this.props.location;
    const { search } = query;
    console.log(search);

    document.addEventListener('DOMContentLoaded', function() {
      let searchBar = document.getElementById("searchBar");
      let searchButton = document.getElementById("searchButton")
      searchButton.addEventListener('click', queryResults, false)
    }, false);

    function queryResults() {
      let searchValue = searchBar.value;
      if (searchValue) {
        //pushUrlQuery({ search: 'test'});
      }
    }

    return(
      <div>
        <h1>Search</h1>
        <form>
          <label htmlFor="search">Search a user or game:</label><br />
          <input id="searchBar" type="text" />
          <button id="searchButton" type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}
