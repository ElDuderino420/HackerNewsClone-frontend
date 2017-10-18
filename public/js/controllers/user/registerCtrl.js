angular.module('haxorNews')
    .controller('registerCtrl', function ($scope, AuthService, $location) {
        $scope.user = {
            userName: '',
            password: ''
        };
        $scope.userNameErr = null;
        $scope.remNameErr = function () {
            $scope.userNameErr = null;
        }
        userNameSetErr = function (status) {
            if (status == null || status == 0) {
                $scope.userNameErr = "database crashed";
            }
            if (status == 666) {
                $scope.userNameErr = "Username invalid or taken";
            }
            if (status == 500) {
                $scope.usernameErr = "database error";
            }

        }
        $scope.register = function () {
            AuthService.register($scope.user,function(result){
                if (result.status == 200) {
                    console.log("register succesful");
                    console.log(result)
                    $location.path('/login')
                }
                else{
                    console.log("something went wrong")
                    userNameSetErr(result.status)
                    console.log(result)
                }
            })
        }
    

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