angular.module('App')
.controller('settingsCtrl', function($rootScope, $scope, userService, $state, fb, $firebaseObject){

    if($rootScope.user === undefined || Object.keys($rootScope.user).length === 0){
        $state.go('main');
        /*userService.getLoggedInUser()
            .then(function(id){
                return userService.getUserObj(id[0])
            })
            .then(function(user){
                $rootScope.user = user;
                if("days" in $rootScope.user.settings.travel) {
                    $rootScope.days = $rootScope.user.settings.travel.days;
                } else {
                    $rootScope.days = {0:{start:'', end:''}, 1:{start:'', end:''}, 2:{start:'', end:''}, 3:{start:'', end:''}, 4:{start:'', end:''}, 5:{start:'', end:''}, 6:{start:'', end:''}}
                }
                $scope.edit = { home: $rootScope.user.locations.home.address === '',
                    work:$rootScope.user.locations.work.address === '',
                    travel:checkForHours(),
                    name:$rootScope.user.name === ''
                };
            });*/
    } else {
        $scope.edit = {
            home:$rootScope.user.locations.home.address === '',
            work:$rootScope.user.locations.work.address === '',
            travel:checkForHours(),
            name:$rootScope.user.name === ''
        };
        if("days" in $rootScope.user.settings.travel) {
            $rootScope.days = $rootScope.user.settings.travel.days;
        } else {
            $rootScope.days = {0:{start:'', end:''}, 1:{start:'', end:''}, 2:{start:'', end:''}, 3:{start:'', end:''}, 4:{start:'', end:''}, 5:{start:'', end:''}, 6:{start:'', end:''}}
        }

        var oldNews = JSON.parse(JSON.stringify($rootScope.user.settings.news));
        var oldWeather = JSON.parse(JSON.stringify($rootScope.user.locations));
        $scope.daysN = {'0':'Sunday','1':'Monday','2':'Tuesday','3':'Wednesday','4':'Thursday','5':'Friday','6':'Saturday'};
    }



    /**
     * Checks each day if times are set
     * @returns {{number}} Amount of days that have no times set
     */
    function checkForHours(){
        var i = {};
        if("days" in $rootScope.user.settings.travel) {
            for (var d = 0; d < 7; d++) {
                i[d] = ($rootScope.user.settings.travel.days[d].start === '' && $rootScope.user.settings.travel.days[d].end === '')
            }
            return i
        } else {
            return {0:true, 1:true, 2:true, 3:true, 4:true, 5:true, 6:true}
        }
    }

    $scope.details = {home:'', work:''};

    /**
     * Commit settings to firebase and local user object
     */
    $rootScope.settingsOK = function(){
        if($state.includes('settings')) {
            if($scope.details.home.formatted_address !== undefined && $scope.edit.home){
                $rootScope.user.locations.home.address = $scope.details.home.formatted_address;
                $scope.edit.home = false;
            } else if (!$scope.edit.home || $rootScope.user.locations.home.address !== '') {
            } else {
                $rootScope.user.locations.home.address = ''
            }

            if($scope.details.work.formatted_address !== undefined && $scope.edit.work){
                $rootScope.user.locations.work.address = $scope.details.work.formatted_address;
                $scope.edit.work = false
            } else if (!$scope.edit.work || $rootScope.user.locations.home.address !== '') {
            } else {
                $rootScope.user.locations.work.address = ''
            }

            if($rootScope.days !== undefined) {
                $rootScope.user.settings.travel.days = $rootScope.days;
            }

            var theme;
            if($('#theme').length === 0){
                theme = 'default'
            } else {
                theme = $('#theme').data('theme')
            }
            $rootScope.user.settings.theme = theme;

            userService.setUserData($rootScope.user);

            if(!isEquivalent(oldNews.categories, $rootScope.user.settings.news.categories) || oldNews.updated !== $rootScope.user.settings.news.updated){
                $rootScope.user.data.news.updated = 0;
            }
            if(!isEquivalent(oldWeather.home, $rootScope.user.locations.home) || !isEquivalent(oldWeather.work, $rootScope.user.locations.work)){
                $rootScope.user.data.weather.updated = 0;
            }

            if($rootScope.user.settings.firstTime){
                $rootScope.user.settings.firstTime = false
            }
            $rootScope.user.$save();
        }
    };

    /**
     * Check if two objects are equal
     *
     * @param a {object} First object to check
     * @param b {object} Second object to check
     * @returns {boolean} If objects are equal or not
     */
    function isEquivalent(a, b) {
        if(a === undefined || b === undefined){
            return false
        }
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        return true;
    }

});