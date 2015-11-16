angular.module('App')
.service('weatherService', function($http) {
    var url = 'http://api.wunderground.com/api/c5e9d80d2269cb64/conditions/geolookup/q/';

    this.getCurrentWeather = function(){
        var lon, lat;
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });

        return $http({
            method: 'GET',
            url: 'weather.json'
            //url: url + lat + ',' + lon + '.json'
        }).then(function(res){
            var data = res.data.current_observation;
            return {
                location: data.display_location.city + ', ' + data.display_location.state,
                temp: data.temp_f,
                icon: data.icon,
                weather: data.weather
            }
        })

    }

});
