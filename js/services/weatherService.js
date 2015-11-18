angular.module('App')
.service('weatherService', function($http) {
    var url = 'http://api.wunderground.com/api/c5e9d80d2269cb64/conditions/';
    var cCondition = '';

    this.getCurrentWeather = function(where){
        var lat, lon;
        
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });

        if(where === 'local'){
            url2 = url + 'geolookup/q/' + lat + ',' + lon + '.json'
        } else {
            url2 = url + '/q/' + where + '.json'
        }

        console.log(url2);

        return $http({
            method: 'GET',
            url: 'weather.json'
            //url: url + 'geolookup/q/' + lat + ',' + lon + '.json'
        }).then(function(res){
            var data = res.data.current_observation;
            cCondition = data.icon;
            return [{
                location: data.display_location.city + ', ' + data.display_location.state,
                temp: data.temp_f,
                icon: data.icon_url,
                weather: data.weather
            }, data.icon]
        })
    };

    this.headerBG = function(){
        return 'images/bg/' + cCondition + '.jpg'
    }

});
