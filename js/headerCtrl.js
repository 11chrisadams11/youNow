angular.module('App')
.controller('headerCtrl', function($scope, userService, $q, fb, $firebaseObject){
    $scope.user = {};
    $scope.updTime = 0;

    userService.getUserData().then(function(user){
        $scope.user = user;
        var ref = new Firebase(fb.url + '/user/' + $scope.user.$id);
        var obj = $firebaseObject(ref);
        obj.$loaded(function(){
            obj.$bindTo($scope, 'user').then(function(unbind){
                $scope.unbind = unbind
            });
        })
    });

    function unbind(){
        return $q(function(res){
            if(typeof $scope.unbind === 'function'){
                $scope.unbind();
            }
            res(true)
        })
    }

    $scope.logout = function(){
        unbind().then(function(){
            $scope.user = {};
            $('#settingsOkButton').removeClass("glyphicon glyphicon-cog glyphicon-ok");
            userService.logout()
        });
    }

});