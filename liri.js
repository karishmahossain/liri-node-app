require("dotenv").config();
var keys = require("./keys.js");


var fs = require("fs");

var request = require('request');

var Spotify = require('node-spotify-api');

var axios = require("axios");


//moment js
var moment = require('moment');
moment().format();

//spotify keys
var spotify = new Spotify(keys.spotify);

//variable for input
var command = process.argv[2];
var input = process.argv[3];

//    * `concert-this`
//rest.bandsintown.com/artists/adel/events?app_id=codingbootcamp#
function concertIt(bandQuery) {

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp";
    // + movieQuery +
    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response) {
          console.log("Venue Name : " + response.data[0].venue.name);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}
//     * `spotify-this-song`
function spotifyIt(musicSearch) {

    //  * If no song is provided then your program will default to "Butterflies" by Kacey Musgraves.
    if (musicSearch === undefined || null) {
        musicSearch = "Butterflies";
    }

    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
                    
        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++){
            
                var musicQuery = data.tracks.items[i];
              
                console.log("Artist: " + musicQuery.artists[0].name);   
                console.log("Song Name: " + musicQuery.name);
                 console.log("Link to Song: " + musicQuery.preview_url);
                console.log("Album Name: " + musicQuery.album.name);
            }
        };  
    });
}

    //movie-this
function movieIt (movieQuery) {
 
    // * If the user doesn't type a movie in, the program will output data for the movie 'Jaws'
     if (movieQuery === undefined || null) {
            movieQuery = "Jaws";
        }

    // Then run a request to the OMDB API with the movie entered
    var queryUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function(response) {
    
          console.log("Title: " + response.data.Title);
          console.log("Year: " + response.data.Year);
          console.log("Rated: " + response.data.Rated);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        }
    );
    
        };

// Switch for commands for all functions
var ask = function (commands, funData){
    switch(commands) {
        case "concert-this":
            concertIt(funData);
            break;
        case "movie-this" :
            movieIt(funData);
            break;    
        case 'spotify-this-song':
            spotifyIt(funData); 
            break;
        case 'do-what-it-says':
            doWhatItSays(); 
            break;
        default:
        console.log("Invalid command. Please try again");
    }
};

//Do what it says reads text from random.txt file
var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) throw err;
            var randomText = data.split(",");
        
        if (randomText.length == 2) {
            ask(randomText[0], randomText[1]);
        }
        else if (randomText.length == 1) {
            ask(randomText[0]);
        }
    });
}
// asigns args to ask for switch case
ask (command, input);