angular.module('haxorNews')
.controller('loginCtrl', function($scope) {

    var urlParams = $location.search();
    $scope.alertText = urlParams.msg;
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.login = function() {
        AuthService.login($scope.user).then(function(user) {
            $location.path('/profile/'+user.displayName);
            $scope.setCurrentUser(user);
            $scope.isAuthorized = AuthService.isAuthorized;
            console.log("login success");
        }, function(errMsg) {

            $scope.dangerText = errMsg
        });
    };
})