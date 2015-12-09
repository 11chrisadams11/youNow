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
    $scope.greeting = getGreeting();

    function getGreeting(){
        var time = new Date(Date.now()).getHours()
        if(time < 5){
            return 'WTF are you doing awake'
        }else if(time >= 5 && time < 12){
            return 'Good Morning'
        } else if (time >= 12 && time < 17){
            return 'Good Afternoon'
        } else if(time >= 17 && time < 21) {
            return 'Good Evening'
        } else {
            return 'Hello'
        }
    }

    $scope.logout = function(){
        $scope.user = {};
        $('#settingsOkButton').removeClass("glyphicon glyphicon-cog glyphicon-ok");
        userService.setTheme('default');
        userService.logout()
    }

});