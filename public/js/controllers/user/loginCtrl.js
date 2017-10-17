angular.module('haxorNews')
.controller('loginCtrl', function($scope, $http, API_ENDPOINT, $location) {

    $scope.user = {
        userName: '',
        password: ''
    };
    $scope.userNameErr = {
        status: false,
        msg: ""
    };
    $scope.remNameErr = function () {
        $scope.userNameErr.status = false;
    }
    userNameSetErr = function (status) {
        $scope.userNameErr.status = true;
        if (status == null|| status == 0) {
            $scope.userNameErr.msg = "database crashed";
        }
        if (status == 666) {
            $scope.userNameErr.msg = "Username invalid or taken";
        }
        if (status == 500) {
            $scope.usernameErr.msg = "database error";
        }

    }
    $scope.login = function () {
        if(user.userName == "asd" || user.password == "asd"){
        $http.post(API_ENDPOINT.url + "/api/user/login", $scope.user).then(function (result) {
            console.log("login Succesful");
            setCurrentUser($scope.user);
            $location.path('/');
        }, function (err) {
            console.log(err)
            userNameSetErr(err.status);

        })}
    };
})