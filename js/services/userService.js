angular.module('App')
    .service('userService', function ($http, $firebaseObject, $firebaseAuth, $firebaseArray, fb, $state, $q, $location) {
        var user = {};
        var authObj;

        this.setUserData = function(u){
            user = u
        };

        this.getUserData = function () {
            return $q(function (resolve) {
                if (Object.keys(user).length === 0) { //If user var is empty, get logged in info
                    getLoggedInUser().then(function (u) {
                        user = u;
                        resolve(user)
                    });
                } else {
                    resolve(user)
                }
            })
        };

        function checkIfUserExistsInDB(id, name) {
            return $q(function (resolve) {
                var ref = new Firebase(fb.url + 'user/' + id);
                ref.once("value", function (snapshot) {
                    var exists = (snapshot.val() !== null); //if user id in DB
                    if (exists) {
                        var d = $firebaseObject(ref);
                        resolve(d)
                    } else {
                        var o = { // create empty user if not in DB
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
                            },
                            data: {
                                weather: {
                                    home: {
                                        icon: '',
                                        quick: '',
                                        full: ''
                                    },
                                    work: {
                                        icon: '',
                                        quick: '',
                                        full: ''
                                    },
                                    local: {
                                        icon: '',
                                        quick: '',
                                        full: ''
                                    }
                                },
                                news: {}
                            },
                            settings: {
                                news: '',
                                weather: {
                                    updates: true
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
                    var provider = authObj.$getAuth().provider;
                    var id = (authObj.$getAuth()[provider].id);
                    var name = (authObj.$getAuth()[provider].displayName);

                    checkIfUserExistsInDB(id, name).then(function (u) {
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
                checkIfUserExistsInDB(id, name).then(function (u) {
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