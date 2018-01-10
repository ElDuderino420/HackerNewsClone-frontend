angular.module('haxorNews')
    .controller('story_singleCtrl', function ($scope, AuthService, $routeParams, $location, $window, $anchorScroll) {
        function init(){
        AuthService.getSingleStory($routeParams.storyId, function (res) {
            if (res.status != null && res.status == 200) {
                $scope.post = res.data;

                $scope.newComment = {
                    "user_name": AuthService.currentUser(),
                    "post_type": "comment",
                    "post_title": "comment title",
                    "post_parent": parseInt($routeParams.storyId),
                    "post_text": ""
                }
                
            } else {
                $location.path("/")
            }
            for (let i = 0; i < $scope.post.comments.length; i++) {
                AuthService.getSingleStory($scope.post.comments[i], function (resC) {
                    if (res.status != null && res.status == 200) {
                        $scope.post.comments[i] = resC.data
                    } else {
                        $scope.post.comments[i] = null
                    }

                })
            }
            console.log($scope.post)
        })
    }
    init();
        $scope.reply = function(com) {
            $scope.replyComment = com
            $location.hash('bottom');
            $anchorScroll();
          };
          $scope.replyReset = function(){
            $scope.replyComment = null;
          }
        $scope.printDate = function(date){
            var time = new Date(date).toString();
            return time.slice(0,time.indexOf(":")-3)
        }
        
        var cur_date = new Date();
        $scope.timeStamp = function(time){
            var diff = cur_date - new Date(time);

            if (diff < 60000) {
            return " just now!" 
            }
            else if(diff >= 60000 && diff < 3600000){
                return Math.floor(diff / 60000) + ' minutes ago' ;
            }
            else if(diff >= 3600000 && diff < 86400000){
                return Math.floor(diff / 3600000) + ' hours ago' ;
            }
            else{
                if(diff <=  172800000){
                    return Math.floor(diff / 86400000) + ' day ago' ;
                }
                return Math.floor(diff / 86400000) + ' days ago' ;
            }
            //return cur_date - created;
        }
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



        $scope.comment = function () {
            if($scope.replyComment != null){
                $scope.newComment.post_parent = parseInt($scope.replyComment.post_id)
            }
            console.log($scope.newComment);
            AuthService.createPost($scope.newComment, function (res) {
                
                init();
            })
            
        }

    });