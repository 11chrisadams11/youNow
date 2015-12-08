angular.module('App')
.directive('settingsOkButton', ['$state', function($state) {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            function load(){
                if($state.includes('main')){
                    $('#settingsOkButton').addClass("glyphicon glyphicon-cog");
                } else if($state.includes('settings')){
                    var jum = $('#header').outerHeight();
                    $('#settingsOkButton').addClass("glyphicon glyphicon-ok").css({'top': jum+20, 'font-size': 40});
                }
            }

            setTimeout(load, 100);

            $(element).on('click', function() {
                $('#settingsPopup').stop(true, true).fadeIn(300);
            });

            element.on('click', function(){
                if($state.includes('main')){
                    element.removeClass('glyphicon-cog').addClass('glyphicon-ok');
                    var jum = $('#header').outerHeight();
                    $('#settingsOkButton').animate({top: jum+20, 'font-size': 40});
                    $state.go('settings')
                } else if($state.includes('settings')){
                    // todo: make button actually save values
                    element.removeClass('glyphicon-ok').addClass('glyphicon-cog');
                    $('#settingsOkButton').animate({top: 10, 'font-size': 20});
                    $state.go('main')
                }
            })
        }
    };
}]);

