angular.module('haxorNews')
    .controller('mainCtrl', function($scope) {
        // create a message to display in our view

        $scope.currentUser = null;
        $scope.isAuthorized = false;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        /*$scope.logout = function () {
            AuthService.logout();
            $scope.setCurrentUser(null);
        }*/

        
    })