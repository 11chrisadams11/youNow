angular.module('App')
.controller('settingsCtrl', function($rootScope, $scope, userService, $state, fb, $firebaseObject){
    var oldNews = JSON.parse(JSON.stringify($scope.user.settings.news));
    var oldWeather = JSON.parse(JSON.stringify($scope.user.locations));
    $scope.days = {'0':'Sunday','1':'Monday','2':'Tuesday','3':'Wednesday','4':'Thursday','5':'Friday','6':'Saturday'};

    if($scope.user === undefined || Object.keys($scope.user).length === 0){
        userService.getUserData().then(function(user){
            $scope.user = user;
            $rootScope.days = $scope.user.settings.travel.days;
            $scope.edit = {
                home:$scope.user.locations.home.address === '',
                work:$scope.user.locations.work.address === '',
                travel:checkForHours(),
                name:$scope.user.name === ''
            };

        });
    } else {
        $scope.edit = {
            home:$scope.user.locations.home.address === '',
            work:$scope.user.locations.work.address === '',
            travel:checkForHours(),
            name:$scope.user.name === ''
        };
        $rootScope.days = $scope.user.settings.travel.days
    }

    function checkForHours(){
        var i = {};
        for(var d=0; d<7; d++){
            i[d] = ($scope.user.settings.travel.days[d].start === '' && $scope.user.settings.travel.days[d].end === '')
        }
        return i
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

            $scope.user.settings.travel.days = $rootScope.days;

            userService.setUserData($scope.user);

            console.log(isEquivalent(oldNews.categories, $scope.user.settings.news.categories))
            if(!isEquivalent(oldNews.categories, $scope.user.settings.news.categories) || oldNews.updated !== $scope.user.settings.news.updated){
                $scope.user.data.news.updated = 0;
            }
            if(!isEquivalent(oldWeather.home, $scope.user.locations.home) || !isEquivalent(oldWeather.work, $scope.user.locations.work)){
                $scope.user.data.weather.updated = 0;
            }

            if($scope.user.settings.firstTime){
                $scope.user.settings.firstTime = false
            }
            $scope.user2 = $scope.user;
            $scope.user2.$save();
        }
    };

    function isEquivalent(a, b) {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        return true;
    }

});