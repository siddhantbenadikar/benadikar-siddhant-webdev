module.exports = function (app) {

    var userModel = require('../model/user/user.model.server');
    // var restaurantModel = require('../model/restaurant/restaurant.model.server');

    app.post('/pal/logout', logout);

    // Admin requests
    app.post('/pal/admin/user', createUserByAdmin);
    app.get('/pal/admin/users', findAllUsersForAdmin);
    app.put('/pal/admin/user/:uid', updateUserByAdmin);
    app.delete('/pal/admin/user/:uid', deleteUserByAdmin);

    // CRUD requests
    app.get("/pal/user", findUser);
    app.get("/pal/user/:userId", findUserById);
    app.post("/pal/user", createUser);
    app.put("/pal/user/:userId", updateUser);
    app.delete("/pal/user/:userId", deleteUser);
    app.put('/pal/user/:uid/restaurant/:rid/like', likeRestaurant);
    app.put('/pal/user/:uid/restaurant/:rid/unlike', unlikeRestaurant);
    app.get('/pal/user/:uid/restaurant/:rid/isLiked', isLiked);
    app.put('/pal/user/:uid/follow/:followid', followUser);
    app.put('/pal/user/:uid/unfollow/:unfollowid', unfollowUser);
    app.get('/pal/user/:uid/isfollowing/:followingid', isFollowing);
    app.get('/pal/user/:uid/following', findAllFollowingUsers);
    app.get('/pal/user/:uid/followers', findAllFollowers);
    app.get('/pal/user/:uid/likes', findAllLikedRestaurants);

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function createUser(req, res){
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function updateUser(req, res){
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserById(req, res){
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function findUser(req, res){
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(req, res);
        }
        else if(username){
            findUserByUsername(req,res);
        }
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteUser(req, res){
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function likeRestaurant(req, res) {
        var userId = req.params['uid'];
        var rid = req.params['rid'];
        userModel
            .likeRestaurant(userId, rid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unlikeRestaurant(req, res) {
        var userId = req.params['uid'];
        var rid = req.params['rid'];
        userModel
            .unlikeRestaurant(userId, rid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isLiked(req, res) {
        var userId = req.params['uid'];
        var rid = req.params['rid'];
        userModel
            .isLiked(userId, rid)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function followUser(req, res) {
        var userId = req.params['uid'];
        var followId = req.params['followid'];
        userModel
            .addFollowing(userId, followId)
            .then(function (stats) {
                return userModel
                    .addFollower(followId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unfollowUser(req, res) {
        var userId = req.params['uid'];
        var unfollowId = req.params['unfollowid'];
        userModel
            .removeFollowing(userId, unfollowId)
            .then(function (stats) {
                return userModel
                    .removeFollower(unfollowId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isFollowing(req, res) {
        var userId = req.params['uid'];
        var followingId = req.params['followingid'];
        userModel
            .isFollowing(userId, followingId)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFollowingUsers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findAllFollowingUsers(user.following);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFollowers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findAllFollowers(user.followers);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllLikedRestaurants(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return restaurantModel
                    .findAllLikedRestaurants(user.restaurantLikes);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (restaurants) {
                res.json(restaurants);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isAdmin(user) {
        return (user.role.indexOf("admin") > -1);
    }

    function createUserByAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            var newUser = req.body;
            userModel
                .createUser(newUser)
                .then(function (user) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    if (err.code === 11000)
                        res.status(409).send("Duplicate username");
                    else
                        res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else {
            res.sendStatus(403);
        }

    }

    function findAllUsersForAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else {
            res.sendStatus(403);
        }
    }

    function updateUserByAdmin(req, res) {
        var user = req.user;
        var change = false;
        if (isAdmin(user)) {
            var newUser = req.body;
            userModel
                .findUserById(newUser._id)
                .then(function (gotUser) {
                    change = !(gotUser.password === newUser.password);
                });
            var newUserId = req.params['uid'];
            userModel
                .updateUser(newUserId, newUser)
                .then(function (stats) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                })
        } else {
            res.sendStatus(403);
        }
    }

    function deleteUserByAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            var newUserId = req.params['uid'];
            userModel
                .deleteUser(newUserId)
                .then(function (stats) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                })
        } else {
            res.sendStatus(403);
        }
    }

};