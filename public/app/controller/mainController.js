//console.log('This is the main Controller');

angular.module('mainController', ['authServices'])

    .controller('mainCtrl', function ($http, $location, $timeout, Auth, $rootScope) {
        // console.log('This is the main controller');
        var app = this;
        var loadme = false;
        var loggedIn = false;

        $rootScope.$on('$routeChangeStart', function () {

            if (Auth.isLoggedIn()) {
                app.loggedIn = true;
                console.log('user is logged in');
                Auth.getUser().then(function (data) {
                    console.log(data.data.username);
                    app.username = data.data.username;
                    app.loadme = true;
                });
            } else {
                console.log('user not logged in');
                app.username = '';
                app.loadme = true;
            }
        });


        app.loading = true;
        app.errMsg = false;
        this.doLogin = function (loginData) {
            //console.log('login check');
            Auth.login(this.loginData).then(function (data) {
                if (data.data.success) {
                    app.loading = false;
                    app.successMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/');
                        app.loginData = '';
                        app.successMsg = false;
                    }, 2000);

                } else {
                    app.loading = false;
                    app.errMsg = data.data.message;
                }
            });

        };

        this.logout = function () {
            Auth.logout();
            $location.path('/logout');
            $timeout(function () {
                $location.path('/');
            }, 2000);
        }

    });


