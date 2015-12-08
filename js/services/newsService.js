angular.module('App')
    .service('newsService', function ($http, $q, userService, fb, $firebaseAuth, $firebaseObject) {
        var url1 = 'http://api.nytimes.com/svc/topstories/v1/',
            url2 = '.json?api-key=560ff7584fa9434472a064377ae35c0b:3:70264294',
        //categories = ['home', 'technology', 'arts', 'sports', 'health'],
            user = {
                data: {
                    news: {}
                }
            };

        function getUserData() {
            return $q(function (resolve) {
                var categories = [];
                angular.forEach(user.settings.news.categories, function (value, key) {
                    if (value) {
                        this.push(key);
                    }
                }, categories);
                resolve(categories)
            });
        }

        function getNews() {
            return $q(function(resolve){
                getUserData().then(function (cat) {
                    var promise = [];

                    cat.forEach(function (e) {
                        var r = $http({
                                method: 'GET',
                                url: url1 + e + url2
                            }).then(function (res) {
                                var data = res.data.results,
                                    image = '';
                                if (res.data.results[0].multimedia === '') {
                                    image = ''
                                } else {
                                    image = data[0].multimedia[3].url
                                }
                                return [e, {
                                    title: data[0].title.replace('&#8217;', "'"),
                                    image: image,
                                    text: data[0].abstract.replace('&#8217;', "'"),
                                    url: data[0].url
                                }];

                            });
                        promise.push(r)
                    });

                    var n = {};

                    $q.all(promise).then(function (val) {
                        val.forEach(function (e) {
                            n[e[0]] = e[1];
                        });
                        n.updated = Date.now();
                        user.data.news = n;
                        resolve(n)
                    });
                });
            })
        }

        this.getNewsData = function (usr) {
            user = usr;
            return $q(function (resolve) {
                if (user.data.news === undefined || Object.keys(user.data.news).length === 0) {
                    var rel = new Firebase(fb.url + 'user/');
                    authObj = $firebaseAuth(rel);
                    if (authObj.$getAuth()) {
                        var provider = authObj.$getAuth().provider;
                        var id = (authObj.$getAuth()[provider].id);
                        var obj = $firebaseObject(new Firebase(fb.url + 'user/' + id + '/data/news'));
                        obj.$loaded(function () {
                            var upd = obj.updated;
                            console.log('new news 1');
                            getNews().then(function (w) {
                                user.data.news = w;
                                resolve(w)
                            })
                        });
                    }
                } else {
                    console.log('new news 2');
                    getNews().then(function (w) {
                        user.data.news = w;
                        resolve(w)
                    })
                }

            })
        }
    });