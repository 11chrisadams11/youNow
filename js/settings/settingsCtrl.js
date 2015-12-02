angular.module('App')
.controller('settingsCtrl', function($rootScope, $scope, userService, $state, fb, $firebaseObject){
    var oldNews = JSON.parse(JSON.stringify($scope.user.settings.news));
    var oldWeather = JSON.parse(JSON.stringify($scope.user.locations));
    if($scope.user === undefined || Object.keys($scope.user).length === 0){
        userService.getUserData().then(function(user){
            $scope.user = user;
            $scope.edit = {
                home:$scope.user.locations.home.address === '',
                work:$scope.user.locations.work.address === '',
                name:$scope.user.name === ''
            };
        });
    } else {
        $scope.edit = {
            home:$scope.user.locations.home.address === '',
            work:$scope.user.locations.work.address === '',
            name:$scope.user.name === ''
        };
    }

    $scope.details = {home:'', work:''};

    $rootScope.settingsOK = function(){
        if($state.includes('settings')) {
            if($scope.details.home.formatted_address !== undefined && $scope.edit.home){
                $scope.user.locations.home.address = $scope.details.home.formatted_address;
                $scope.edit.home = false;
            } else if (!$scope.edit.home || $scope.user.locations.home.address !== '') {
            } else {
                $scope.user.locations.home.address = ''
            }

            if($scope.details.work.formatted_address !== undefined && $scope.edit.work){
                $scope.user.locations.work.address = $scope.details.work.formatted_address;
                $scope.edit.work = false
            } else if (!$scope.edit.work || $scope.user.locations.home.address !== '') {
            } else {
                $scope.user.locations.work.address = ''
            }

            userService.setUserData($scope.user);

            if(oldNews !== $scope.user.settings.news){
                $scope.user.data.news.updated = 0;
            }
            if(oldWeather !== $scope.user.locations){
                $scope.user.data.weather.updated = 0;
            }

            if($scope.user.settings.firstTime){
                $scope.user.settings.firstTime = false
            }
            $scope.user2 = $scope.user;
            $scope.user2.$save();
        }
    }
});