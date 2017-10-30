angular.module('haxorNews')
    .controller('newPostCtrl', function ($scope, AuthService, $location) {
        $scope.post = {
            "user_name": AuthService.currentUser(),
            "post_type": "story",
            "post_title": "",
            "post_parent": -1,
            "post_text": ""
        }
        $scope.types = ["story","poll"]

        $scope.newPost = function () {
            
            console.log($scope.post);
            if($scope.post.user_name != null){
                AuthService.createPost($scope.post,function(res){
                    $location.path('#/')
                })
            }else{
                console.log("wat")
            }
            

        }
    });