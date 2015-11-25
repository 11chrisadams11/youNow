angular.module('App')
.controller('mainCtrl', function($scope, weatherService, userService, fb, $firebaseObject){

    if(Object.keys($scope.user).length === 0){
        userService.getUserData().then(function(user){
            $scope.user = user;
        });
    }

    function getWeather() {
        weatherService.getWeatherData()
            .then(function (data) {
                $scope.user.data.weather = data;
            });
    }


    setTimeout(function(){getWeather()}, 1000);

    $scope.fullWeather = function(w, $event){
        $($event.target).html($scope.user.data.weather[w].full)
    }
});