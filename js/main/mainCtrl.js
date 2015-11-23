angular.module('App')
.controller('mainCtrl', function($rootScope, $scope, weatherService, userService, fb, $firebaseObject){

    userService.getUserData().then(function(user){
        $rootScope.user = user;
    });

    function getWeather(){
        weatherService.getWeatherData().then(function(data){
            $rootScope.user.data.weather = data;
            //getWeather();
        }).then(function(){
            console.log($rootScope.user.data.weather[1]);
            weatherService.getCurrentWeather($rootScope.user.data.weather[1]).then(function(w){
                //$rootScope.user.data.weather = w;
                $scope.weather = w
            });
        })
    }

    //$rootScope.user = userService.getUserData();
    setTimeout(function(){getWeather()}, 1000);
    setTimeout(function(){$rootScope.user.data.weather = $scope.weather; console.log($rootScope.user.data, $scope.weather)}, 2000);

    //$scope.user = userService.getLoggedInUser();
});