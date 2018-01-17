require("dotenv").config();
//importing from key.js
var keys = require("./key.js");
//needed for twitter api 
var Twitter = require('twitter');
var T = new Twitter(keys.twitter); 
//needed for spoify api 
var spotify = require('node-spotify-api')
var S = new spotify(keys.spotify);
//allows for user input
var action = (process.argv[2]);
//title for movie and song 
var title = (process.argv[3]);
//if else statments that determine which rule is used
if (action === "my-tweets"){
	var params = {
		q: 'duner_guy',
		
		count: 20
	};
	T.get('search/tweets', params,searchedData);
	function searchedData(err, data, response) {
		if(err){
			console.log("error");
		}else{
			console.log(data);
		}
	};	
}else if (action === "spotify-this-song"){
	S.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
        var song = data.tracks.items;        
        for (i = 0; i < song.length; i++){
        	console.log("Artist: " + song[i].artists[i].name);
        	console.log("Album Title: " + song[i].album.name);
        	console.log("Spotify Link: " + song[i].preview_url);
        	console.log("Track Title: " + song[i].name);
        } 
});
}else if (action === "movie-this"){
	// require for the omdb api
	 var request = require("request");
	 var queryUrl = "http://www.omdbapi.com/?t="+ title +"&y=&plot=short&tomatoes=true&apikey=trilogy"
	console.log(queryUrl);
	request(queryUrl, function(error, response, body) {
  		// If there were no errors and the response code was 200 
  		if (!error && response.statusCode === 200) {
    		console.log("Title: " + JSON.parse(body).Title);
    		console.log("Year Made: " + JSON.parse(body).Year);    		
    		console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
    		//***YOU NEED TO FIX THIS*** 
    		console.log(response);
    		console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).tomatoRotten);
    		console.log("Made In: " + JSON.parse(body).Country);
			console.log("It was made in these Language(s): " + JSON.parse(body).Language); 
			console.log("A PLot of the movie: " + JSON.parse(body).Plot);
    		console.log("Actors in this movie: " + JSON.parse(body).Actors);
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
 			//***you need to make this run in terr.
	 		console.log(data);

		}
	});
}	