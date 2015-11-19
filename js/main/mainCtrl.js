angular.module('App')
.controller('mainCtrl', function($rootScope, $scope, weatherService, userService, $q){

    function getWeather(){
        $scope.weather = weatherService.getCurrentWeather();
    }

        userService.getUser();
    setTimeout(getWeather, 5000)
});