
angular.module('haxorNews')
    .factory('AuthService', function (API_ENDPOINT, $http, $location) {
        var currentUser = {};
        return {
            isLoggedIn: function () {
                if (currentUser.userName != "" && currentUser.password != "" && currentUser.userName != null && currentUser.password != null) {
                    return true
                } else {
                    return false
                }
            },
            currentUser: function () {
                if (currentUser != {}) {
                    return currentUser.userName;
                } else {
                    return "derp";
                }

            },
            logout: function () {
                currentUser = {};
            },
            register: function (user, callback) {

                $http.post(API_ENDPOINT.url + "/api/user/new", user).then(function (result) {
                    if (result.data != null) {
                        //console.log("yay")
                        callback(result);
                    }
                }, function (err) {
                    if (err != null) {
                        //console.log("nooo")
                        callback(err);
                    }
                })

            },
            deleteUser: function (callback) {
                $http.delete(API_ENDPOINT.url + "/api/user/delete", user).then(function (result) {
                    if (result.data != null) {
                        callback(result);
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err);
                    }
                })
            },
            updatePassword: function (newPassword, callback) {
                var newPass = {
                    userName: currentUser.userName,
                    oldPlainTextPassword: currentUser.password,
                    newPlainTextPassword: newPassword
                }
                $http.put(API_ENDPOINT.url + "/api/user/update", newPass).then(function (result) {
                    if (result.data != null) {
                        callback(result);
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err);
                    }
                })
            },
            login: function (user, callback) {
                //remove if when backend fixed;
                    $http.post(API_ENDPOINT.url + "/api/user/login", user).then(function (result) {

                        if (result != null) {
                            currentUser = user
                            callback(result)
                        }
                    }, function (err) {
                        if (err != null) {
                            callback(err)
                        }
                    })
            },
            getAllUsers: function (callback) {
                $http.get(API_ENDPOINT.url + "/api/user/all").then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            profileKarma: function (userName, callback) {
                $http.get(API_ENDPOINT.url + '/api/user/karma/' + userName).then(function (res) {
                    callback(res.data)
                });
            },
            getSingleStory: function (storyId, callback) {
                $http.get(API_ENDPOINT.url + "/api/post/" + storyId).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            getRecentStories: function (amount, callback) {
                $http.get(API_ENDPOINT.url + "/api/post/newest/" + amount).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            getHighStories: function (amount, callback) {
                $http.get(API_ENDPOINT.url + "/api/post/highest/" + amount).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            createPost: function (post, callback) {
                $http.post(API_ENDPOINT.url + "/api/post/new", post).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            deletePost: function (storyId, callback) {
                var temp = {
                    user_name: currentUser.userName,
                    password: currentUser.password,
                    post_id: storyId
                }
                $http.delete(API_ENDPOINT.url + "/api/post", temp).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            getUserStories: function (username, callback) {
                $http.get(API_ENDPOINT.url + "/api/post/all/" + username).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            editPost: function (storyId, newTitle, newText, callback) {
                var temp = {
                    post_id: storyId,
                    new_post_title: newTitle,
                    new_post_text: newText
                }
                $http.get(API_ENDPOINT.url + "/api/post/edit", temp).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            upVote: function (storyId, callback) {
                $http.put(API_ENDPOINT.url + "/api/post/upvote", { post_id: storyId }).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            downVote: function (storyId, callback) {
                $http.put(API_ENDPOINT.url + "/api/post/downvote", { post_id: storyId }).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            flag: function (storyId, callback) {
                $http.put(API_ENDPOINT.url + "/api/post/flag", { post_id: storyId }).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            },
            getStorykarma: function (storyId, callback) {
                $http.get(API_ENDPOINT.url + "/api/post/karma/" + storyId).then(function (result) {
                    if (result != null) {
                        callback(result)
                    }
                }, function (err) {
                    if (err != null) {
                        callback(err)
                    }
                })
            }
        }
    });