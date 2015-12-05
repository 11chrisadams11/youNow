angular.module('App')
.controller('loginCtrl', function($scope, userService, $state, fb, $firebaseObject, $q) {

    $scope.logInWith = function (service) {
        userService.loginWith(service)
            .then(function (idArr) {
                return userService.checkIfUserExistsInDB(idArr[0], idArr[1])
            })
            .then(function(exists){
                console.log(exists)
                return userService.getObject(exists[0], exists[1], exists[2])
            })
            .then(function(u) {
                console.log(u[0])
                $scope.user = u[1];
                return u[0];
            })
            .then(function(id){
                console.log(id)
                return $q(function(resolve){
                    var ref = new Firebase(fb.url + '/user/' + id);
                    var obj = $firebaseObject(ref);
                    console.log(obj)
                    resolve(obj)
                })
            })
            .then(function(obj){
                console.log(obj)
                $scope.user2 = obj;
                if ($scope.user.settings.firstTime) {
                    $scope.user.settings.firstTime = false;
                    $scope.user3 = $scope.user;
                    $scope.user2.$save();
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