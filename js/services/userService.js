angular.module('App')
    .service('userService', function ($http, $firebaseObject, $firebaseAuth, $firebaseArray, fb, $state, $q, $location) {
        var user = {};
        var authObj;

        this.setUserData = function(u){
            user = u
        };

        this.getUserData = function () {
            return $q(function (resolve) {
                if (Object.keys(user).length === 0) {
                    getLoggedInUser().then(function (u) {
                        user = u;
                        resolve(user)
                    });
                } else {
                    resolve(user)
                }
            })
        };

        function getUser(id, name) {
            return $q(function (resolve) {
                var ref = new Firebase(fb.url + 'user/' + id);
                ref.once("value", function (snapshot) {
                    var exists = (snapshot.val() !== null);
                    if (exists) {
                        var d = $firebaseObject(ref);
                        resolve(d)
                    } else {
                        var o = {
                            name: name,
                            locations: {
                                home: {
                                    address: '',
                                    weatherUpdates: true
                                },
                                work: {
                                    address: '',
                                    weatherUpdates: true
                                }
                            }
                        };
                        ref.set(o, function () {
                            resolve(o)
                        });
                    }
                })
            })
        }

        this.logout = function () {
            authObj.$unauth();
            user = {};
            $state.go('login');
        };

        function getLoggedInUser() {
            return $q(function (resolve) {
                authObj = $firebaseAuth(new Firebase(fb.url + 'user/'));
                if (authObj.$getAuth()) {
                    authObj = $firebaseAuth(new Firebase(fb.url + 'user/' + id));
                    var provider = authObj.$getAuth().provider;
                    var id = (authObj.$getAuth()[provider].id);

                    getUser(id, '').then(function (u) {
                        resolve(u)
                    })
                }
            })
        }

        this.loginWith = function (service) {
            authObj = $firebaseAuth(new Firebase(fb.url + 'user/'));
            authObj.$authWithOAuthPopup(service).then(function (authData) {
                var id = (authData[authData.provider].id);
                var name = (authData[authData.provider].displayName);
                authObj = $firebaseAuth(new Firebase(fb.url + 'user/' + id));
                getUser(id, name).then(function (u) {
                    user = u;
                    $('#settingsOkButton').addClass("glyphicon glyphicon-cog");
                    $state.go('main')
                });
            }).catch(function (error) {
                console.error("Authentication failed:", error);
                $state.go('login')
            });
        };

    });