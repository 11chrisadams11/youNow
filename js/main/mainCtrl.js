angular.module('App')
.controller('mainCtrl', function($scope, weatherService, newsService, userService){
    var update;

    if($scope.user === undefined || Object.keys($scope.user).length === 0){
        userService.getUserData().then(function(user){
            $scope.user = user;
        });
    }

    function getWeather() {
        weatherService.getWeatherData()
            .then(function (data) {
                $scope.user.data.weather = data;
                $scope.user2 = $scope.user;
                $scope.user2.$save();

                var upd = $scope.user.data.weather.updated;
                if(upd !== undefined){
                    clearTimeout(upd);
                }

                update = setTimeout(getWeather, (upd+600000));
                console.log('Get new weather in ' + Math.round(((upd+600000)-Date.now())/60000) + ' minutes.')
            });
    }

    function getNews(){
        if($scope.user.settings.news.updates){
            newsService.getNewsData($scope.user).then(function(data){
                $scope.user.data.news = data;
                $scope.user2 = $scope.user;
                $scope.user2.$save();
            })
        }
    }


    setTimeout(function(){getWeather()}, 1000);
    setTimeout(function(){getNews()}, 2000);
});