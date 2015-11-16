angular.module('App')
.service('userService', function($http){
    var user = {
        name: 'Chris'
    };

    this.getUser = function(){
        return user
    }


});