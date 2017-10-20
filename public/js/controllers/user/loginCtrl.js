angular.module('haxorNews')
.controller('loginCtrl', function($scope, AuthService, $location) {

    $scope.user = {
        userName: '',
        password: ''
    };
    $scope.userNameErr = null;
    $scope.remNameErr = function () {
        $scope.userNameErr = null;
    }
    userNameSetErr = function (status) {
        if (status == null|| status == 0) {
            $scope.userNameErr = "database crashed";
        }
        if (status == 666) {
            $scope.userNameErr = "Username invalid or taken";
        }
        if (status == 500) {
            $scope.usernameErr = "database error";
        }

    }
    $scope.login = function () {
        AuthService.login($scope.user,function(result){
            if(result == "err"){
                console.log("login fix until backend fixed use {asd,asd}")
                userNameSetErr(500)
                console.log(result)
            }
            else if (result.status = 200) {
                console.log("login succesful");
                console.log(result)
                $location.path('/profile/'+AuthService.currentUser());
            }
            else{
                console.log("something went wrong")
                userNameSetErr(result.status)
                console.log(result)
            }
        })
    }
})