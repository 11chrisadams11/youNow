angular.module('App')
.service('movieService', function ($http, $q, userService, fb, $firebaseAuth, $firebaseObject) {

    this.getTheaterMovies = function(usr){
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=j66zchayd6megzhvzhp33dm9&callback=JSON_CALLBACK&limit=10';
        return $q(function(resolve){
            if(usr.data.movies === undefined || usr.data.movies.theater.updated === undefined){usr.data.movies = {theater:{updated:0}}}
            $http({
                method: 'JSONP',
                url: url
            }).then(function(res){
                var data = res.data.movies,
                    movies = {};
                for(var i in data){
                    movies[data[i].id] = {
                        title: data[i].title,
                        ratings: data[i].ratings,
                        poster: data[i].posters.thumbnail,
                        link: data[i].links.alternate
                    }
                }
                movies.updated = Date.now();
                resolve(movies)
            })
        })
    };

    this.getDVDMovies = function(usr){
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/new_releases.json?apikey=j66zchayd6megzhvzhp33dm9&callback=JSON_CALLBACK&page_limit=10&page=1';
        return $q(function(resolve){
            if(usr.data.movies === undefined || usr.data.movies.dvd.updated === undefined){usr.data.movies = {dvd:{updated:0}}}
            $http({
                method: 'JSONP',
                url: url
            }).then(function(res){
                var data = res.data.movies,
                    movies = {};
                for(var i in data){
                    movies[data[i].id] = {
                        title: data[i].title,
                        ratings: data[i].ratings,
                        poster: data[i].posters.thumbnail,
                        link: data[i].links.alternate
                    }
                }
                movies.updated = Date.now();
                resolve(movies)
            })
        })
    };



});