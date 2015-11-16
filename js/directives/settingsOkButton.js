angular.module('App')
.directive('settingsOkButton', ['$state', function($state) {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            function load(){
                if($state.includes('main')){
                    document.getElementById('settingsOkButton').className = "glyphicon glyphicon-cog";
                } else if($state.includes('settings')){
                    document.getElementById('settingsOkButton').className = "glyphicon glyphicon-ok";
                }
            }

            setTimeout(load, 100);

            element.on('click', function(){
                if($state.includes('main')){
                    element.removeClass('glyphicon-cog').addClass('glyphicon-ok');
                    var jum = $('#header').outerHeight();
                    $('#settingsOkButton').animate({top: jum-30});
                    $state.go('settings')
                } else if($state.includes('settings')){
                    element.removeClass('glyphicon-ok').addClass('glyphicon-cog');
                    $('#settingsOkButton').animate({top: 10});
                    $state.go('main')
                }
            })
        }
    };
}]);

