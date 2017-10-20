angular.module('haxorNews')
    .controller('homeCtrl', function ($scope, AuthService) {

        $scope.types = {
            types: [ "Most Recent Posts", "All Users"],
            chosen: "Most Recent Posts"
        };
        //"Highest Score Posts"

        $scope.changeSearch = function () {
            console.log($scope.types.chosen);
            switch ($scope.types.chosen) {
                case "Highest Score Posts":
                AuthService.getHighStories(10, function (res) {
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

        
        
        


        $scope.getPostScore = function (upvote, downvote) {
            var total = upvote - downvote;
            if (total % 1000 < 0) {
                return Math.floor(total / 1000).toString() + "k";
            } else {
                return (total).toString();
            }
        }
        $scope.upvote = function (storyId) {
            console.log("id: " + storyId)
            document.getElementById("upvoteImg" + storyId).src = "./images/upvote.png";
            console.log($scope.types.chosen)
        }
        $scope.downvote = function (storyId) {
            console.log("id: " + storyId)
            document.getElementById("downvoteImg" + storyId).src = "./images/downvote.png";

        }


    })