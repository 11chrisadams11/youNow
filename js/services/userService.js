angular.module('App')
.service('userService', function($http, $firebaseObject){
    var user = {
        name: 'Chris'
    };

    this.getUserData = function(){
        return user
    };

    this.getUser = function(){
        var obj = $firebaseObject(new Firebase('https://younow.firebaseio.com/user/0'));
        obj.$loaded().then(function(){
            user = obj
        });
    };

});