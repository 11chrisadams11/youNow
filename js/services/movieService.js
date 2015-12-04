angular.module('App')
.service('movieService', function ($http, $q, userService, fb, $firebaseAuth, $firebaseObject) {
    var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=j66zchayd6megzhvzhp33dm9&limit=10'

    this.getMovies = function(usr){
        return $q(function(resolve){
            $http({
                method: 'GET',
                url: url
            }).then(function(res){
                console.log(res.data)
            })
        })
    }

});