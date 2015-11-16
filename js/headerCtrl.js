angular.module('App')
.controller('headerCtrl', function($scope, userService, weatherService){
    $scope.user = userService.getUser();
    $scope.updateInt = 30;

   function getWeather(){
       weatherService.getCurrentWeather().then(function(weather){
           $scope.weather = weather
       })
   }

    getWeather()

});