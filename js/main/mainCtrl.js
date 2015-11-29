angular.module('App')
.controller('mainCtrl', function($scope, weatherService, newsService, userService){
    var upd;

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
                if(upd !== undefined){
                    clearTimeout(upd);
                }

                upd = setTimeout(getWeather, (upd+600000));
                console.log('Get new weather in ' + parseInt(((upd+600000))/60000) + ' minutes.')
            });
    }

    function getNews(){
        newsService.getNewsData($scope.user).then(function(data){
            $scope.user.data.news = data
        })
    }


    setTimeout(function(){getWeather()}, 1000);
    setTimeout(function(){getNews()}, 2000);
});