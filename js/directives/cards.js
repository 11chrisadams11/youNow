angular.module('App')
.directive('card', [function() {
    return {
        restrict: 'A',
        replace: true,
        link: function link(scope, element, attrs, $scope) {
            /*element.on('click', function(){
                console.log(element.find('div.fullWeather').attr('ng-show'))
                element.find('div.fullWeather').attr('ng-show', 'true');
                //attrs['ng-if']='true';
                console.log(element.find('div.fullWeather').attr('ng-show'))
            })*/
        },
        templateUrl: 'js/cards/cards.html'
    };
}]);

