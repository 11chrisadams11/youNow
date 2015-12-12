angular.module('App')
.controller('mainCtrl', function($rootScope, $scope, weatherService, newsService, userService, travelService, movieService, $timeout){
    var updateWeather, updateNews;

    if($rootScope.user === undefined || Object.keys($rootScope.user).length === 0){
        userService.getLoggedInUser()
            .then(function(id){
                return userService.getUserObj(id[0])
            })
            .then(function(user){
                $rootScope.user = user;
                $('#settingsOkButton').addClass("glyphicon glyphicon-cog");
                $timeout(function(){firstRun()}, 2000)

            });
    } else {
        firstRun()
    }

    function getWeather() {
        if((Date.now() - $rootScope.user.data.weather.updated) > (600000*3)) {
            weatherService.getCurrentWeather($rootScope.user)
                .then(function (data) {
                    $rootScope.user.data.weather = data;
                    saveData();

                    setWeatherUpdate()
                });
        } else {
            setWeatherUpdate()
        }
    }

    function setWeatherUpdate(){
        var upd = $rootScope.user.data.weather.updated;
        if (updateWeather !== undefined) {
            clearTimeout(updateWeather);
        }

        updateWeather = setTimeout(function () {getWeather()}, ((upd + 600500 * 3) - Date.now()));
        console.log('Get new weather in ' + Math.round(((upd + 600000 * 3) - Date.now()) / 60000) + ' minutes.')
    }

    function getNews(){
        if($rootScope.user.settings.news.updates && (Date.now() - $rootScope.user.data.news.updated) > 600000){

            newsService.getNewsData($rootScope.user).then(function(data){
                $rootScope.user.data.news = data;
                saveData();

                setNewsUpdate()
            })
        } else {
            if($rootScope.user.settings.news.updates){
                setNewsUpdate()
            }
        }
    }

    function setNewsUpdate(){
        var upd = $rootScope.user.data.news.updated;
        if(updateNews !== undefined){
            clearTimeout(updateNews);
        }

        updateNews = setTimeout(function(){getNews()}, ((upd+601000)-Date.now()));
        console.log('Get new news in ' + Math.round(((upd+600000)-Date.now())/60000) + ' minutes.')
    }

    function getTravel(){
        if($rootScope.user.settings.travel.updates){
            userService.getLocation()
                .then(function(loc){
                    return travelService.getTravelInfo($rootScope.user, loc)
                })
                .then(function(data){
                    if(data.travelAfterWork){
                        $scope.travelAfterWork = true
                    } else {
                        $rootScope.user.data.travel = data;
                        saveData();
                        $scope.travelAfterWork = false
                    }
                })
        }
    }

    function getMovies(){
        if($rootScope.user.settings.movies.theater && (Date.now() - $rootScope.user.data.movies.theater.updated) > 3600000){
            movieService.getTheaterMovies($rootScope.user).then(function(data){
                $rootScope.user.data.movies.theater = data;
                saveData()
            });
        }
        if($rootScope.user.settings.movies.dvd && (Date.now() - $rootScope.user.data.movies.dvd.updated) > 3600000) {
            movieService.getDVDMovies($rootScope.user).then(function (data) {
                $rootScope.user.data.movies.dvd = data;
                saveData()
            })
        }
    }


    function saveData(){
        userService.setUserData($rootScope.user);
        $rootScope.user.$save();
    }

    function firstRun(){
        userService.setTheme($rootScope.user.settings.theme);
        getWeather();
        getTravel();
        getNews();
        getMovies();
    }
});