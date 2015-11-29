angular.module('App')
.controller('settingsCtrl', function($rootScope, $scope, userService, $state){

    if(Object.keys($scope.user).length === 0){
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
            //$scope.user.data.weather.updated = 0
            $scope.user.data.news.updated = 0
        }
    }
});