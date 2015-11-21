angular.module('App')
.controller('headerCtrl', function($rootScope, $scope, userService){
    userService.getUserData().then(function(user){
        $rootScope.user = user
    });

    $scope.logout = function(){
        if(typeof $rootScope.unbind === 'function'){
            $rootScope.unbind();
        }
        $rootScope.user = {};
        $('#settingsOkButton').removeClass("glyphicon glyphicon-cog glyphicon-ok");
        userService.logout()
    }
});