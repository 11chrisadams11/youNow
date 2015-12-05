angular.module('App')
.controller('headerCtrl', function($scope, userService, $q, fb, $firebaseObject){

    userService.getUserData().then(function(user){
        $scope.user = user;
        var ref = new Firebase(fb.url + '/user/' + $scope.user.$id);
        $scope.user2 = $firebaseObject(ref);
    });


    $scope.logout = function(){
        $scope.user = {};
        $('#settingsOkButton').removeClass("glyphicon glyphicon-cog glyphicon-ok");
        userService.setTheme('default');
        userService.logout()
    }

});