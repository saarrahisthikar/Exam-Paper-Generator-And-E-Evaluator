angular.module('userController', ['userServices'])


    .controller('registerController', function ($http, $location, $timeout, User) {

        var app = this;

        // register student
        this.regUser = function (regData, valid) {
            app.errorMsg = false;
            app.loading = true;
            console.log('register form submitted');

            // checking whether the form is valid
            if (valid) {
                User.create(app.regData).then(function (data) {
                    if (data.data.success) {
                        console.log(data.data.success);
                        app.loading = false;
                        app.successMsg = data.data.message;
                        $timeout(function () {
                            app.regData = null;
                            $location.path('/login');
                        }, 2000);

                    } else {
                        app.loading = false;
                        console.log(data.data.success);
                        app.errorMsg = data.data.message;
                    }
                });
            } else {
                app.loading = false;
                app.errormsg = "Please ensure that the form is filled properly";
            }
        };

        // registering instructor
        this.regInstructor = function (regData, valid) {

            app.errorMsg = false;
            app.loading = true;

            if (valid) {
                // creating instructor
                User.createInstructor(app.regData).then(function (data) {

                    if (data.data.success) {
                        app.loading = false;
                        app.successMsg = data.data.message;
                        $timeout(function () {
                            app.regData = null;
                            app.loading = false;
                            app.successMsg = false;
                            $location.path('/');
                        }, 2000);
                    } else {
                        app.loading = false;
                        console.log(data.data.success);
                        console.log(data.data.message);
                        app.errorMsg = data.data.message;
                    }
                });
            } else {
                app.loading = false;
                app.errormsg = "Please ensure that the form is filled properly";
            }

        };

        //checkUsernmae
        this.checkUsernmae = function (regData) {

            var userInvalid = false;
            var usernameMsg = true;

            // checking the username
            User.checkUsernmae(app.regData).then(function (data) {
                if (data.data.success) {
                    app.usernameInvalid = false;
                    app.usernameMsg = data.data.message;
                } else {
                    app.usernameInvalid = true;
                    app.usernameMsg = data.data.message;
                }
            }
            );

        }

        // check Email
        this.checkEmail = function (regData) {

            var emailInvalid = false;
            var emailMsg = true;

            // checking the availability of email
            User.checkEmail(app.regData).then(function (data) {
                if (data.data.success) {
                    app.emailInvalid = false;
                    app.emailMsg = data.data.message;
                } else {
                    app.emailInvalid = true;
                    app.emailMsg = data.data.message;
                }
            }
            );
        }

    })

    // confirm password
    .directive('match', function () {
        return {
            restrict: 'A',
            controller: function ($scope) {
                $scope.confirmed = false;
                $scope.doConfirm = function (values) {
                    values.forEach(function (ele) {
                        if ($scope.confirm == ele) {
                            $scope.confirmed = true;
                        } else {
                            $scope.confirmed = false;
                        }
                    });

                }
            },
            link: function (scope, element, attrs) {
                attrs.$observe('match', function () {
                    scope.matches = JSON.parse(attrs.match);
                    scope.doConfirm(scope.matches);
                });
                scope.$watch('confirm', function () {
                    scope.matches = JSON.parse(attrs.match);
                    scope.doConfirm(scope.matches);
                });
            }
        }
    }

    );