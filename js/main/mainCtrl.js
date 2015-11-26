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
                var upd = $scope.user.data.weather.updated;
                console.log(parseInt(upd.toString().slice(0,upd.toString().length-4)), $scope.updTime)
                if(parseInt(upd.toString().slice(0,upd.toString().length-4)) !== $scope.updTime){
                    $scope.updTime = parseInt(upd.toString().slice(0,upd.toString().length-4));
                    clearTimeout($scope.update);
                    $scope.update = setTimeout(getWeather, ((Date.now() - $scope.user.data.weather.updated)+600000));
                    console.log('Get new weather in ' + ((Date.now() - $scope.user.data.weather.updated)+600000))
                }
            // todo: Figure out how to update in 10 minutes
            });
    }


    setTimeout(function(){getWeather()}, 1000);
});