angular.module('App')
.controller('headerCtrl', function($rootScope, $scope, userService, weatherService){
    $scope.user = userService.getUser();

    var updateBG = function(){
        var imgUrl = 'images/bg/' + $rootScope.weatherBG + '.jpg';
        $('#header').css('backgroundImage', 'url(' + imgUrl + ')');
    };

});