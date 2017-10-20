angular.module('haxorNews')
    .controller('mainCtrl', function($scope, AuthService) {
        // create a message to display in our view
        $scope.$watch( AuthService.isLoggedIn, function ( isLoggedIn ) {
            $scope.isLoggedIn = isLoggedIn;
            $scope.currentUser = AuthService.currentUser();
          });
          $scope.logOut = function(){
            AuthService.logout();
          }

        /*$scope.logout = function () {
            AuthService.logout();
            $scope.setCurrentUser(null);
        }*/

        
    })