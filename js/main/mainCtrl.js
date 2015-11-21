angular.module('App')
.controller('mainCtrl', function($rootScope, $scope, weatherService, userService, fb, $firebaseObject){

    userService.getUserData().then(function(user){
        $rootScope.user = user;
/*        var ref = new Firebase(fb.url + '/user/' + $rootScope.user.$id);
        var obj = $firebaseObject(ref);
        obj.$bindTo($rootScope, 'user').then(function(unbind){
            $rootScope.unbind2 = unbind
        });*/
    });

    function getWeather(){
        weatherService.getCurrentWeather().then(function(w){
            $rootScope.user.data.weather = w;
            $scope.weather = w
        });
    }

    //$rootScope.user = userService.getUserData();
    setTimeout(getWeather, 1000);

    //$scope.user = userService.getLoggedInUser();
});