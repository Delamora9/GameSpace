# GameSpace Project - CSC 515 - Advanced Internet Programming #
**Final Submission Due: 5/12/2017**

## Running the Project ##
### Running the project:
 * npm install
 * npm start

The project should be running on port 8081 after those two commands.

### Running the tests:
 1. Unit Tests: karma start (must have karma-cli)
 2. E2E Tests:
   * npm install -g protractor
   * webdriver-manager update
   * webdriver-manager start
   * In a separate window: protractor protractor.conf.js

## Objective ##
Design a single page application with the ability to search for users/games, display game information, and display user information.
Steam will be used as the base for games and users. React will be used to build the project.

## Project Specifications ##
 * Be a single page web application.
 * Have at least 3 unique views (pages).
 * Run in IE 11 and the latest stable release of Edge, FireFox, Chrome and Safari.
 * Make API calls to a remote service.
 * Have a nice look and feel.

## Details on Views ##
  1. Display games and users - It will be searchable by game and/or user, and selecting one result will redirect the user to either the user profile or game profile view.
  2. User profiles - Information such as friends, games owned, and games recently played will be available through this view.
  3. Game profiles - This view will show current news and information on the game.
