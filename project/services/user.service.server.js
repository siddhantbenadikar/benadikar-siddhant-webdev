module.exports = function (app) {

    var userModel = require('../model/user/user.model.server');
    var restaurantModel = require('../model/restaurant/restaurant.model.server');

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var auth = authorized;


///////////////////////////////////////////////////////////////////////////////////////////////
    // REQUESTS
    // Login and logout requests
    app.post('/pal/login', passport.authenticate('local'), login);
    app.post('/pal/logout', logout);
    app.post('/pal/register', register);
    app.get('/pal/loggedin', loggedIn);
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#!/user/null',
            failureRedirect: '/project/#!/login'
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#!/user/null',
            failureRedirect: '/project/#!/login'
        }));

    // Admin requests
    app.post('/pal/admin/user', auth, createUserByAdmin);
    app.get('/pal/admin/users', auth, findAllUsersForAdmin);
    app.put('/pal/admin/user/:uid', auth, updateUserByAdmin);
    app.delete('/pal/admin/user/:uid', auth, deleteUserByAdmin);

    // CRUD requests
    app.get("/pal/search/users", getAllUsers);
    app.get("/pal/user", findUser);
    app.get("/pal/user/:userId", findUserById);
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
///////////////////////////////////////////////////////////////////////////////////////////////
    // PASSPORT CONFIGURATIONS
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel.findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log("Inside security facebook strategy!!");
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        firstName: names[0],
                        lastName: names[1],
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    userModel
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            console.log(err);
                            return done(err, null);
                        });
                }
            }, function (err) {
                console.log(err);
                return done(err, null);
            });
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////
    // REQUEST FUNCTIONS

    function getAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function register(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }, function (err) {
                if (err.code === 11000)
                    res.status(409).send("Duplicate username");
                else
                    res.status(400).send(err);
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
        var body = req.body;
        var username = body.username;
        var password = body.password;
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
        var body = req.body;
        var username = body.username;
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
                return restaurantModel.findAllLikedRestaurants(user.restaurantLikes);
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