(function () {
    angular
        .module("Palate")
        .controller("ProfileFollowingController", profileFollowingController);

    function profileFollowingController($routeParams, UserService) {
        var model = this;
        model.navUserId = $routeParams.userId;
        model.follow = follow;
        model.unfollow = unfollow;
        model.unfollowFromProfile = unfollowFromProfile;
        model.followFromProfile = followFromProfile

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        model.user = user;
                        isAlreadyFollowing();
                        return UserService.findAllFollowingUsers(model.navUserId);
                    }
                })
                .then(function (response) {
                    var users = response.data;
                    if(users) {
                        isFollowingFromBefore(users);
                        UserService.findUserById(model.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if(user)
                                    model.navUser = user;
                            });
                    }
                });
        }init();

        function isAlreadyFollowing() {
            model.alreadyFollowing = (model.user.following.indexOf(model.navUserId) > -1);
        }

        function isFollowingFromBefore(users) {
            users.forEach(function (user, index, array) {
                user.alreadyFollowing = (model.user.following.indexOf(user._id) > -1);
                user.itsMe = (model.user._id === user._id);
            });
            model.users = users;
        }

        function follow(index) {
            var userId = model.users[index]._id;
            UserService.follow(model.user._id, userId)
                .then(function (response) {
                    var status = response.data;
                    model.users[index].alreadyFollowing = true;
                }, function (error) {
                    model.users[index].alreadyFollowing = false;
                });
        }

        function unfollow(index) {
            var userId = model.users[index]._id;
            UserService.unfollow(model.user._id, userId)
                .then(function (response) {
                    var status = response.data;
                    model.users[index].alreadyFollowing = false;
                }, function (error) {
                    model.users[index].alreadyFollowing = true;
                });
        }

        function followFromProfile() {
            UserService
                .follow(model.user._id, model.navUserId)
                .then(function (response) {
                    var status = response.data;
                    model.alreadyFollowing = true;
                }, function (err) {
                    model.alreadyFollowing = false;
                });
        }

        function unfollowFromProfile() {
            UserService
                .unfollow(model.user._id, model.navUserId)
                .then(function (response) {
                    var status = response.data;
                    model.alreadyFollowing = false;
                }, function (err) {
                    model.alreadyFollowing = true;
                });
        }

    }
})();