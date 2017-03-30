//console.log('Testing user controller');

angular.module('userController', ['userServices'])

    /**  .config(function () { 
          console.log('inside userController')}
  
      );
      */
    .controller('registerController', function ($http, $location, $timeout, User) {
        //   console.log('inside register controller');

        var app = this;


        // register student
        this.regUser = function (regData, valid) {
            app.errorMsg = false;
            // app.successMsg = false;
            app.loading = true;
            console.log('register form submitted');
            //console.log(this.regData);
            if (valid) {
                User.create(app.regData).then(function (data) {
                    if (data.data.success) {
                        console.log(data.data.success);
                        app.loading = false;
                        app.successMsg = data.data.message;
                        $timeout(function () {
                            $location.path('/');
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
            // app.successMsg = false;
            app.loading = true;
            console.log('Instructor register form submitted');
            //console.log(this.regData);
            if (valid) {
                User.createInstructor(app.regData).then(function (data) {
                    if (data.data.success) {
                        console.log(data.data.success);
                        app.loading = false;
                        app.insSuccessMsg = data.data.message;
                        console.log(app.insSuccessMsg);
                        $timeout(function () {
                            $location.path('/addInstructor');
                        }, 2000);

                    } else {
                        app.loading = false;
                        console.log(data.data.success);
                        console.log(data.data.message);
                        app.insErrorMsg = data.data.message;
                    }
                });
            } else {
                app.loading = false;
                app.insErrormsg = "Please ensure that the form is filled properly";
            }
        };

        this.checkUsernmae = function (regData) {

            var userInvalid = false;
            var usernameMsg = true;

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

        this.checkEmail = function (regData) {

            var emailInvalid = false;
            var emailMsg = true;

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

    .directive('match', function () {
        return {
            restrict: 'A',
            controller: function ($scope) {
                $scope.confirmed = false;
                $scope.doConfirm = function (values) {
                    values.forEach(function (ele) {
                        // console.log(ele);
                        //console.log($scope.confirm)
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
                    // console.log(attrs.match);
                    scope.doConfirm(scope.matches);
                });
                scope.$watch('confirm', function () {
                    scope.matches = JSON.parse(attrs.match);
                    // console.log(attrs.match);
                    scope.doConfirm(scope.matches);
                });
            }
        }
    }

    );