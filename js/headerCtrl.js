angular.module('App')
.controller('headerCtrl', function($rootScope, $scope, userService, $q, fb, $firebaseObject){
    userService.getUserData().then(function(user){
        $rootScope.user = user;
        var ref = new Firebase(fb.url + '/user/' + $rootScope.user.$id);
        var obj = $firebaseObject(ref);
        obj.$bindTo($rootScope, 'user').then(function(unbind){
            $rootScope.unbind = unbind
        });
    });

    function unbind(){
        return $q(function(res){
            if(typeof $rootScope.unbind === 'function'){
                $rootScope.unbind();
            }
            if(typeof $rootScope.unbind2 === 'function'){
                $rootScope.unbind2();
            }
            res(true)
        })
    }

    $scope.logout = function(){
        unbind().then(function(){
            $rootScope.user = {};
            $('#settingsOkButton').removeClass("glyphicon glyphicon-cog glyphicon-ok");
            userService.logout()
        });
    }
});