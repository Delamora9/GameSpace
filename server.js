"use strict";
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./make-webpack-config')('dev');

var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

## --------your proxy----------------------
var app = express();
## proxy the request for static assets
app.use('/fist', proxy(url.parse('http://localhost:8081/dist')));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

# -----------------My stuff-------------

// var request = require('request');

// var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
//     'v2/?key=36991C4777F98B19F85825A2368DE13A&appid=8930';

// request.get(url, function(error, steamHttpResponse, steamHttpBody) {
//     // Print to console to prove we downloaded the achievements.
//     console.log(steamHttpBody);
// });

// app.get('/steam/civ5achievements', function(httpRequest, httpResponse) {
//     // Calculate the Steam API URL we want to use
//     var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
//         'v2/?key=36991C4777F98B19F85825A2368DE13A&appid=8930';
//     request.get(url, function(error, steamHttpResponse, steamHttpBody) {
//         // Once we get the body of the steamHttpResponse, send it to our client
//         // as our own httpResponse
//         httpResponse.setHeader('Content-Type', 'application/json');
//         httpResponse.send(steamHttpBody);
//     });
// });

// app.use('/', express.static('public'));

// var bodyParser = require('body-parser');

// app.use(bodyParser.text());

// app.post('/frank-blog', function(httpRequest, httpResponse) {
//     console.log(httpRequest.body);
//     // We need to respond to the request so the web browser knows
//     // something happened.
//     // If you've got nothing better to say, it's considered good practice to
//     // return the original POST body.
//     httpResponse.status(200).send('Posted today:\n\n' + httpRequest.body);
// });

# -----webpack-dev-server------------------
var server = new WebpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/dist/",

    stats: { colors: true }
});

## run the two servers
server.listen(8081, "localhost", function() {});
app.listen(8081);
