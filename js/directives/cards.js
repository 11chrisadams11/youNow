angular.module('App')
.directive('card', [function() {
    return {
        restrict: 'A',
        //replace: true,
        scope: {
            'user': 'user'
        },
        link: function link(scope, element, attrs) {
            element.on('click', function(){
                element.html(scope.user)
            })
        },
        templateUrl: 'js/cards/cards.html'
    };
}]);

