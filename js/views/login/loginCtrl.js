angular.module('App')
.controller('loginCtrl', function($scope, userService, $state, fb, $firebaseObject){

    $scope.logInWith = function(service){
        userService.loginWith(service).then(function(u) {
            $scope.user = u;
            var ref = new Firebase(fb.url + '/user/' + $scope.user.$id);
            $scope.user2 = $firebaseObject(ref);
        }).then(function(){
            if($scope.user.settings.firstTime){
                $scope.user.settings.firstTime = false;
                $scope.user2 = $scope.user;
                $scope.user2.$save();
                var jum = $('#header').outerHeight();
                $('#settingsOkButton').addClass("glyphicon glyphicon-ok").css({'top': jum+20, 'font-size': 40});
                $state.go('settings')
            } else {
                $('#settingsOkButton').addClass("glyphicon glyphicon-cog");
                $state.go('main')
            }
        });
    };

});