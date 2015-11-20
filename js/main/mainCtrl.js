angular.module('App')
.controller('mainCtrl', function($rootScope, $scope, weatherService, userService, $q){

    function getWeather(){
        weatherService.getCurrentWeather().then(function(w){
            $scope.weather = w
        });
    }

    //$rootScope.user = userService.getUserData();
    setTimeout(getWeather, 1000);

    //$scope.user = userService.getLoggedInUser();
});