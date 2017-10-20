angular.module('haxorNews')
    .controller('newPostCtrl', function ($scope, AuthService, $location) {
        $scope.post = {
            "user_name": AuthService.currentUser(),
            "post_type": "story",
            "post_title": "",
            "post_parent": 0,
            "hanesst_id": 0,
            "post_text": ""
        }
        $scope.types = ["story","poll"]

        $scope.newPost = function () {
            $scope.post.hanesst_id = Math.floor(Math.random()*10000000000000+10000000000000);
            console.log($scope.post);
            if($scope.post.user_name != null){
                AuthService.createPost($scope.post,function(res){
                    $location.path('/story/'+$scope.post.hanesst_id)
                })
            }else{
                console.log("wat")
            }
            

        }
    });