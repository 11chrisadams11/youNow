angular.module('App')
.controller('mainCtrl', function($rootScope, $scope, weatherService){

    function getWeather(){
        weatherService.getCurrentWeather('local').then(function(weather){
            $scope.weather = weather[0];
            $rootScope.weatherBG = weather[1]
        })
    }

    getWeather()
});