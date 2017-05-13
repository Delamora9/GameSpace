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

## Details on GameSpace ##
The GameSpace web application provides a way for people to access information in Steam's database in a visual and user friendly way. You can search for users and games within Steam and look checkout different information about them. The Steam data is retrieved using the Steam Web API (https://developer.valvesoftware.com/wiki/Steam_Web_API). This API provides a way to connect to the database through HTTP. Our application retrieves JSON data through this API and displays it to the user. GameSpace is a single page web application using React libraries and components which currently runs on a webpack dev server.

### App Views
The home page of our application is an empty version of the search view. The top navbar and footer will remain on the page for all views.
The 'Home' link in the navbar will return you to the home page, while the 'User Profile' and 'Game Profile' links will take you to example
user or game's profile page respectively.

1. __Search View__
    - The search page gives the user the ability to search the Steam API for users or games
    - The results generated are displayed and act as links to the profile of the user or game
    - You can choose to search for just games, just users or both
2. __User Profile View__
    - The user profile page will display information about a selected Steam user
    - At the top of the page the name, location and time of the user's last sign in will be shown
    - The friends list will display the number of friends that the user has with a list of 5 of those friends bellow it
      - If the friend's account is public, the user's real name will be shown next to their user name and provide a link to that user's profile
      - If the friend's account is private it will specify "Private Profile" next to the user name
    - The Games section of the user profile will provide recently played and owned games
    - Recently played games will show the number of games and a list of up to 5 of those games with a link to the game's profile
    - Owned games will show the number of games and a random list of up to 5 of those games with links to the game's profiles as well
3. __Game Profile View__
    - The game profile page will display a selected game's Achievements and News
    - The Achievements list will populate with each achievement's name along with the percentage of players who have earned it
    - The Game News list will populate with any news posting for the game within Steam

### Notes
  - If a particular list of information is not found or retrievable form the Steam database, there will be a message that there is none to display
  - Due to the nature of private Steam accounts, their information cannot be retrieved through the Steam API
  - It is believed that the Steam API does not have a URL decoder on the receiving end of their application. Due to this, users with special characters in their name will not be retrievable through the API
  - While private users and users with special characters in their name will not be retrievable, they can still appear in the Friends list of other users

## Contributors
__Keith Cissell__ -         https://github.com/KeithCissell
__Nick Delamora__ -         https://github.com/Delamora9
__Christopher Franklyn__ -  https://github.com/cfranklynn
__Jess Geiger__ -           https://github.com/CheezitBandit
__River Ginther__ -         https://github.com/rginther