angular.module('haxorNews')
    .controller('registerCtrl', function ($scope, API_ENDPOINT, $http, $location) {
        $scope.user = {
            userName: '',
            password: ''
        };
        $scope.userNameErr = {
            status: false,
            msg: ""
        };
        $scope.setDangerText = function(){
            $scope.dangerText = null;
        }
        $scope.remNameErr = function () {
            $scope.userNameErr.status = false;
        }
        userNameSetErr = function (status) {
            $scope.userNameErr.status = true;
            if (status == null || status == 0) {
                $scope.userNameErr.msg = "database crashed";
                $scope.dangerText = "database crashed!"
            }
            if (status == 666) {
                $scope.userNameErr.msg = "Username invalid or taken";
            }
            if (status == 500) {
                $scope.usernameErr.msg = "database error";
            }
            
        }
        $scope.register = function () {
            $http.post(API_ENDPOINT.url + "/api/user/new", $scope.user).then(function (result) {
                console.log("Sign up Succesful");
                $location.path('/login');
            }, function (err) {
                console.log(err)
                userNameSetErr(err.status);

            })
        };
        /*$scope.signup = function(user) {
            AuthService.register(user).then(function(msg) {
                $location.path('/login');
                console.log("signup success");
            }, function(errMsg) {
                console.log("Error in signup controller");
            });
        };
    
        var register = function(user) {
            return $q(function(resolve, reject) {
                $http.post(API_ENDPOINT.url + '/user/signup', user).then(function(result) {
                    if (result.data.success) {
                        resolve(result.data.msg);
                    } else {
                        reject(result.data.msg);
                    }
                }, function (err) {
                    reject(err.data.msg);
                });
            });
        };*/
    });