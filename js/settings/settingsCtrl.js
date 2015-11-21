angular.module('App')
.controller('settingsCtrl', function($rootScope, $scope, userService, $state, fb, $firebaseObject){
    $scope.edit = {
        home:$rootScope.user.locations.home.address === '',
        work:$rootScope.user.locations.work.address === '',
        name:$rootScope.user.name === ''
    };
    $scope.details = {home:'', work:''};

    /*var ref = new Firebase(fb.url + '/user/' + $rootScope.user.$id);
    var obj = $firebaseObject(ref);
    obj.$bindTo($rootScope, 'user').then(function(unbind){
       $rootScope.unbind = unbind
    });*/


    $rootScope.settingsOK = function(){
        if($state.includes('settings')) {
            if($scope.details.home.formatted_address !== undefined && $scope.edit.home){
                    $rootScope.user.locations.home.address = $scope.details.home.formatted_address;
                    $scope.edit.home = false
            } else if (!$scope.edit.home || $rootScope.user.locations.home.address !== '') {
            } else {
                $rootScope.user.locations.home.address = ''
            }
            if($scope.details.work.formatted_address !== undefined){
                if($scope.edit.work) {
                    $rootScope.user.locations.work.address = $scope.details.work.formatted_address;
                    $scope.edit.work = false
                }
            } else if (!$scope.edit.work || $rootScope.user.locations.home.address !== '') {
            } else {
                $rootScope.user.locations.work.address = ''
            }
            userService.setUserData($rootScope.user)
        }
    }
});