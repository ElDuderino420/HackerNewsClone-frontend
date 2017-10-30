angular.module('haxorNews')
    .controller('homeCtrl', function ($scope, AuthService) {

        $scope.types = {
            types: ["Most Recent Posts", "All Users", "Highest Score Posts"],
            chosen: "Most Recent Posts"
        };


        $scope.changeSearch = function () {
            console.log($scope.types.chosen);
            switch ($scope.types.chosen) {
                case "Highest Score Posts":
                    AuthService.getHighStories(1, function (res) {
                        if (res.status != null && res.status == 200) {
                            $scope.stories = res.data;
                        } else {
                            console.log("something wrong man...")
                        }
                        console.log(res.data);

                    })
                    break;
                case "Most Recent Posts":
                    AuthService.getRecentStories(10, function (res) {
                        if (res.status != null && res.status == 200) {
                            $scope.stories = res.data;
                        } else {
                            console.log("something wrong man...")
                        }
                        console.log(res.data);
                    })
                    break;
                case "All Users":
                    AuthService.getAllUsers(function (res) {
                        if (res.status != null && res.status == 200) {
                            $scope.stories = res.data;
                        } else {
                            console.log("something wrong man...")
                        }
                        console.log(res.data);

                    })
                    break;

                default:
                    break;
            }
        }
        $scope.changeSearch();



        $scope.close = function (storyId) {
            $('#close' + storyId).hide();
            $('#more' + storyId).show();
            $('#postText' + storyId).hide();
            console.log("asd2")
        }

        $scope.more = function (storyId) {
            $('#close' + storyId).show();
            $('#more' + storyId).hide();
            $('#postText' + storyId).show();
            console.log("asd")
        }
        $scope.getPostScore = function (upvote, downvote) {
            var total = upvote - downvote;
            if (total % 1000 < 0) {
                return Math.floor(total / 1000).toString() + "k";
            } else {
                return (total).toString();
            }
        }
        $scope.upvote = function (storyId) {
            AuthService.upVote(storyId, function (res) {
                if (res.status == 200) {
                    console.log("id: " + storyId + " was upvoted!")
                    document.getElementById("upvoteImg" + storyId).src = "./images/upvote.png";
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
                }
                else {
                    console.log("id: " + storyId + " was NOT downvoted! something went wrong m8")
                }
            })
        }


    })