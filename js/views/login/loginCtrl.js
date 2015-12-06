angular.module('App')
.controller('loginCtrl', function($rootScope, $scope, userService, $state, fb, $firebaseObject, $q) {

    $scope.logInWith = function (service) {
        userService.loginWith(service)
            .then(function (idArr) {
                return userService.checkIfUserExistsInDB(idArr[0], idArr[1])
            })
            .then(function(exists){
                return userService.setEmptyObject(exists[0], exists[1])
            })
            .then(function(id){
                return userService.getUserObj(id)
            })
            .then(function(obj){
                $rootScope.user = obj;
                userService.setUserData(obj);
                if ($rootScope.user.settings.firstTime) {
                    $rootScope.user.settings.firstTime = false;
                    $rootScope.user.$save();
                    var jum = $('#header').outerHeight();
                    $('#settingsOkButton').addClass("glyphicon glyphicon-ok").css({
                        'top': jum + 20,
                        'font-size': 40
                    });
                    $state.go('settings')
                } else {
                    $('#settingsOkButton').addClass("glyphicon glyphicon-cog");
                    $state.go('main')
                }
            });
    }
});