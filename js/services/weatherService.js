angular.module('App')
    .service('weatherService', function ($http, $q, userService) {
        var url = 'http://api.wunderground.com/api/c5e9d80d2269cb64/conditions/';

        this.getCurrentWeather = function() {
            return $q(function(resolve){
                userService.getUserData().then(function(u){
                    var user = u,
                        w = [];

                    goGet('local', 'local').then(function (ww) {
                        w.push(ww)
                    });

                    for (var i in user.locations) {
                        (function (e) {
                            if (user.locations.hasOwnProperty(e)) {
                                if (user.locations[e].address !== '' && user.locations[e].weatherUpdates) {
                                    if(user.locations[e].address.length === 5){
                                        var zip = user.locations[e].address
                                    } else {
                                        var zip = user.locations[e].address.split(' ')[user.locations[e].address.split(' ').length-2].replace(',', '');
                                    }
                                    goGet(zip, e).then(function (ww) {
                                        w.push(ww)
                                    });
                                }
                            }
                        })(i)
                    }

                    function goGet(where, name) {
                        return $q(function (resolve) {
                            getLocation(where).then(function (url) {
                                getWeather(url, name).then(function (weather) {
                                    resolve(weather);
                                })
                            });
                        })

                    }

                    resolve(w)
                });
            })

        };

        function getLocation(where) {
            return $q(function(resolve){
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })
                });
            }).then(function(res){
                var url2;
                if (where === 'local') {
                    url2 = url + 'geolookup/q/' + res.lat + ',' + res.lon + '.json'
                } else {
                    url2 = url + 'q/' + where + '.json'
                }
                return url2
            })
        }

        function getWeather(url, name){
            return $http({
                method: 'GET',
                url: 'weather.json'
                //url: url
            }).then(function(res){
                var data = res.data.current_observation;
                var o = {};
                o = {
                    name: name,
                    location: data.display_location.city + ', ' + data.display_location.state,
                    temp: data.temp_f + '°',
                    icon: data.icon_url,
                    weather: data.weather
                };
                return o
            })
        }

    });
