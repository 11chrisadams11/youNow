angular.module('App')
.controller('headerCtrl', function($rootScope, $scope, userService){
    userService.getUserData().then(function(user){
        $rootScope.user = user
    });
});