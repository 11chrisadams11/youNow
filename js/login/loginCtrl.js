angular.module('App')
.controller('loginCtrl', function($scope, userService){

    $scope.loginWithGoogle = function(){
        userService.loginWith('google');
    };

    $scope.loginWithGithub = function(){
        userService.loginWith('github');
    };

});