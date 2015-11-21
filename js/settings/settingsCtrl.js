angular.module('App')
.controller('settingsCtrl', function($rootScope, $scope, userService, $state, fb, $firebaseObject){

    var ref = new Firebase(fb.url + '/user/' + $rootScope.user.$id);
    var obj = $firebaseObject(ref);
    obj.$bindTo($rootScope, 'user').then(function(unbind){
       $rootScope.unbind = unbind
    });


    $rootScope.settingsOK = function(){
        if($state.includes('settings')) {
                userService.setUserData($rootScope.user)
        }
    }
});