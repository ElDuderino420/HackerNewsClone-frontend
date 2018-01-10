angular.module('haxorNews')
    .controller('story_singleCtrl', function ($scope, AuthService, $routeParams, $location, $window, $anchorScroll) {
        function init() {
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

                $scope.post = getComments(res.data);
                console.log($scope.post)
            })
        }

        function getComments(arr) {
            for (let i = 0; i < arr.comments.length; i++) {
                AuthService.getSingleStory(arr.comments[i], function (res) {
                    if (res.status != null && res.status == 200) {

                        arr.comments[i] = getComments(res.data);

                    } else {
                        arr.comments[i] = null
                    }

                })
            }
            return arr

        }
        init();
        

                $scope.reply = function (com) {
                    $scope.replyComment = com
            $location.hash('bottom');
            $anchorScroll();
        };
        $scope.replyReset = function () {
                    $scope.replyComment = null;
                }
        $scope.printDate = function (date) {
            var time = new Date(date).toString();
            return time.slice(0, time.indexOf(":") - 3)
        }

        var cur_date = new Date();
        $scope.timeStamp = function (time) {
            var diff = cur_date - new Date(time);

            if (diff < 60000) {
                return " just now!"
            }
            else if (diff >= 60000 && diff < 3600000) {
                return Math.floor(diff / 60000) + ' minutes ago';
            }
            else if (diff >= 3600000 && diff < 86400000) {
                return Math.floor(diff / 3600000) + ' hours ago';
            }
            else {
                if (diff <= 172800000) {
                    return Math.floor(diff / 86400000) + ' day ago';
                }
                return Math.floor(diff / 86400000) + ' days ago';
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

                $scope.htmlComments = function (comment) {
            return '<div class="card home" style="margin-bottom:50px" ng-repeat="com in post.comments">' +
                '<div class="card-body" style="padding:5px">' +
                ' <div class="vote" style="width:20px;">' +
                '<img id="{{\'upvoteImg\'+com.post_id}}" alt="" src="./images/upvote_not.png" ng-click="upvote(com.post_id)">' +
                '<img id="{{\'downvoteImg\'+com.post_id}}" alt="" src="./images/downvote_not.png" ng-click="downvote(com.post_id)">' +
                '</div>' +
                '<div class="not_vote">' +
                '<div class="title" style="font-size:12px">' +
                '<a href="{{\'#/profile/\'+com.user_name}}">' +
                '{{ com.user_name }}' +
                '</a>' +
                '<b style="float:left"> &nbsp;&nbsp;{{ com.total_score + tempScore[com.post_id.toString()] }} points </b>' +
                '<time style="float:left">&nbsp;&nbsp;&nbsp; &nbsp;{{ timeStamp(com.created_at)}}&nbsp;&nbsp;&nbsp;&nbsp;</time>' +
                '<a href="" style="color:blue" ng-click="reply(' + com + ')">comment</a>' +
                '<i ng-click="flag(com.post_id)" class="fa fa-flag-o" aria-hidden="true"></i>' +
                '</div>' +
                '<div>' +
                '<div style="display:inline-block;width:90%;min-width:200px" class="card-text" id="{{\'postText\'+com.post_id}}">' +
                '{{ com.post_text }}' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        }

        $scope.comment = function () {
            if ($scope.replyComment != null) {
                            $scope.newComment.post_parent = parseInt($scope.replyComment.post_id)
                        }
                        console.log($scope.newComment);
            AuthService.createPost($scope.newComment, function (res) {

                            init();
                        })

        }

    });