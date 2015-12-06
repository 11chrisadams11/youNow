angular.module('App')
.controller('headerCtrl', function($rootScope, $scope, userService, $q, fb, $firebaseObject){

/*    if($rootScope.user === undefined || Object.keys($rootScope.user).length === 0) {
        userService.getLoggedInUser()
            .then(function (idArr) {
                return userService.checkIfUserExistsInDB(idArr[0], idArr[1])
            })
            .then(function (id) {
                return userService.getFirebaseObj(id)
            })
            .then(function (user) {
                $rootScope.user = user;
                $rootScope.user2 = user
            });
    }*/


    $scope.logout = function(){
        $scope.user = {};
        $('#settingsOkButton').removeClass("glyphicon glyphicon-cog glyphicon-ok");
        userService.setTheme('default');
        userService.logout()
    }

});