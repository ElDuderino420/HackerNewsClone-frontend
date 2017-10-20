angular.module('haxorNews')
.controller('story_singleCtrl', function($scope, AuthService, $routeParams, $location) {
    AuthService.getSingleStory($routeParams.storyId,function(res){
        if(res.status != null && res.status == 200){
            $scope.post = res.data;
        }else{
            $location.path("/")
        }
        console.log(res.data)
    })

});