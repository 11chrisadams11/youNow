angular.module('App')
.service('userService', function($http, $firebaseObject, $firebaseAuth, $firebaseArray, fb, $state, $q){
    var user = {};

    this.getUserData = function(){
        return $q(function(resolve){
            if(Object.keys(user).length === 0){
                getLoggedInUser().then(function(u){
                    user = u;
                    resolve(user)
                });

            } else {
                resolve(user)
            }
        })


    };

    function getUser(id, name){
        return $q(function(resolve) {
            var ref = new Firebase(fb.url + 'user/' + id);
            ref.once("value", function (snapshot) {
                var exists = (snapshot.val() !== null);
                if (exists) {
                    resolve($firebaseObject(ref))
                } else {
                    var o = {
                        name: name,
                        locations: {
                            home: '',
                            work: ''
                        }
                    };
                    ref.set(o, function () {
                        resolve(o)
                    });

                }
            })
        })
    }


    this.logout = function(){
        var ref = new Firebase(fb.url);
        $scope.authObj = $firebaseAuth(ref);
        $scope.authObj.$unauth();
        $state.go('login');
    };

    function getLoggedInUser(){
       return $q(function(resolve){
           var authObj = $firebaseAuth(new Firebase(fb.url));
           if(authObj.$getAuth()){
               var provider = authObj.$getAuth().provider;
               var id = (authObj.$getAuth()[provider].id);
               getUser(id, '').then(function(u){
                   resolve(u)
               })
           }
       })

    }

    this.loginWith = function(service){
        var authObj = $firebaseAuth(new Firebase(fb.url));
        authObj.$authWithOAuthPopup(service).then(function(authData) {
            var id = (authData[authData.provider].id);
            var name = (authData[authData.provider].displayName);
            getUser(id, name).then(function(u){
                user = u;
                $state.go('main')
            });
        }).catch(function(error) {
            console.error("Authentication failed:", error);
            $state.go('login')
        });
    };

});