angular.module('haxorNews')
    .controller('homeCtrl', function ($scope, AuthService) {

        $scope.types = {
            types: ["Most Recent Posts", "Highest Score Posts"],
            chosen: "Most Recent Posts"
        };
        $scope.tempScore = {};

        function changeLoad(loadState){
            if(loadState){
                document.getElementById("loader_parent").style.display = "block"
                document.getElementById("loading_done").style.display = "none"
            }
            else{
                document.getElementById("loader_parent").style.display = "none"
                document.getElementById("loading_done").style.display = "inline"
            }
        }
    
        $scope.changeSearch = function () {
            console.log($scope.types.chosen);
            switch ($scope.types.chosen) {
                case "Highest Score Posts":
                    changeLoad(true)
                    AuthService.getHighStories(10, function (res) {
                        if (res.status != null && res.status == 200) {
                            changeLoad(false)
                            $scope.stories = res.data;
                        } else {
                            console.log("something wrong man...")
                        }
                        console.log(res.data);

                    })
                    break;
                case "Most Recent Posts":
                changeLoad(true)
                    AuthService.getRecentStories(10, function (res) {
                        if (res.status != null && res.status == 200) {
                            changeLoad(false)
                            $scope.stories = res.data;
                        } else {
                            console.log("something wrong man...")
                        }
                        console.log(res.data);
                    })
                    break;
                /*case "All Users":
                changeLoad(true)
                    AuthService.getAllUsers(function (res) {
                        if (res.status != null && res.status == 200) {
                            changeLoad(false)
                            $scope.stories = res.data;
                        } else {
                            console.log("something wrong man...")
                        }
                        console.log(res.data);

                    })
                    break;*/

                default:
                    break;
            }
        }
        $scope.changeSearch();

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
        $scope.flag = function(storyId){
            AuthService.flag(storyId, function (res) {
                if (res.status == 200) {
                    console.log("id: " + storyId + " was flagged!")
                    
                }
                else {
                    console.log("id: " + storyId + " was NOT flagged! something went wrong m8")
                }
            })
        }
        $scope.upvote = function (storyId) {
            AuthService.upVote(storyId, function (res) {
                if (res.status == 200) {
                    console.log("id: " + storyId + " was upvoted!")
                    document.getElementById("upvoteImg" + storyId).src = "./images/upvote.png";
                    if($scope.tempScore[storyId.toString()] != null){
                        $scope.tempScore[storyId.toString()] += 1
                    }else{
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
                    if($scope.tempScore[storyId.toString()] != null){
                        $scope.tempScore[storyId.toString()] += -1
                    }else{
                        $scope.tempScore[storyId.toString()] = -1
                    }
                    console.log($scope.tempScore)
                }
                else {
                    console.log("id: " + storyId + " was NOT downvoted! something went wrong m8")
                }
            })
        }


    })