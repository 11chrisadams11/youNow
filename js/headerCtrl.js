angular.module('App')
.controller('headerCtrl', function($rootScope, $scope, userService){

    $scope.greeting = getGreeting();

    function getGreeting(){
        var time = new Date(Date.now()).getHours();
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