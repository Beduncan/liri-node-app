require("dotenv").config();
//importing from key.js
var keys = require("./key.js");
console.log(keys.twitter);
//needed for twitter api 
var Twitter = require('twitter');
var T = new Twitter(keys.twitter); 
//needed for spoify api 
var spotify = require('node-spotify-api')
var S = new spotify(keys.spotify);

//allows for user input
var action = (process.argv[2]);
var title = (process.argv[3]);

if (action === "my-tweets"){
	var params = {
		q: 'yay',
		count: 20
	};
	T.get('search/tweets', params,searchedData);
	function searchedData(err, data, response) {
		console.log(data);
	};	
}else if (action === "spotify-this-song"){
	S.search({ type: 'track', query: title }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
	console.log(data); 
	});
}else if (action === "movie-this"){
	// require for the omdb api
	 var request = require("request");
	 var queryUrl = "http:www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy"
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {
  		// If there were no errors and the response code was 200 
  		if (!error && response.statusCode === 200) {
    		console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  		}else{
  			console.log("failed");
  		}
	});
}else if (action === "do-what-it-says"){
	//require for the fs install
	const fs = require("fs");
	fs.readFile("random.txt", "utf8", function(error, data){
 		if (error){
 		console.log("error");
 		}
 		else {
	 		console.log("worked");
	 		console.log(data);
		}
	});
}	