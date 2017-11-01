angular.module('haxorNews')
    .controller('story_singleCtrl', function ($scope, AuthService, $routeParams, $location, $window) {
        AuthService.getSingleStory($routeParams.storyId, function (res) {
            if (res.status != null && res.status == 200) {
                $scope.post = res.data;
            } else {
                $location.path("/")
            }
            console.log(res.data)
        })

        $scope.upvote = function (storyId) {
            AuthService.upVote(storyId, function (res) {
                if (res.status == 200) {
                    console.log("id: " + storyId + " was upvoted!")
                    document.getElementById("upvoteImg" + storyId).src = "./images/upvote.png";
                    if ($scope.tempScore[storyId.toString()] != null) {
                        $scope.tempScore[storyId.toString()] += 1
                    } else {
                        $scope.tempScore[storyId.toString()] = 1
                    }
                    console.log($scope.tempScore)
                }
                else {
                    console.log("id: " + storyId + " was NOT upvoted! something went wrong m8")
                }
            })

        }
        $scope.downvote = function (storyId) {
            AuthService.downVote(storyId, function (res) {
                if (res.status == 200) {
                    console.log("id: " + storyId + " was downvoted!")
                    document.getElementById("downvoteImg" + storyId).src = "./images/downvote.png";
                    if ($scope.tempScore[storyId.toString()] != null) {
                        $scope.tempScore[storyId.toString()] += -1
                    } else {
                        $scope.tempScore[storyId.toString()] = -1
                    }
                    console.log($scope.tempScore)
                }
                else {
                    console.log("id: " + storyId + " was NOT downvoted! something went wrong m8")
                }
            })
        }

        $scope.newComment = {
            "user_name": AuthService.currentUser(),
            "post_type": "comment",
            "post_title": "commentitle",
            "post_parent": 0,
            "post_text": ""
        }

        $scope.comment = function (postId) {
            $scope.newComment.post_parent = parseInt(postId);
            console.log($scope.newComment);
            console.log(postId);

            if ($scope.newComment.user_name != null) {
                AuthService.createPost($scope.newComment, function (res) {
                    $scope.newComment.post_text = "";
                    
                })
            } else {
                console.log("wat")
            }
        }

    });