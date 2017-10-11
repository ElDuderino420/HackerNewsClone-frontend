angular.module('haxorNews')
.controller('newPostCtrl', function($scope) {
    $scope.post = {
        title: '',
        posttext: ''
    };
    $scope.newPost = function(post){
        console.log("new story posted", post);
    }
});