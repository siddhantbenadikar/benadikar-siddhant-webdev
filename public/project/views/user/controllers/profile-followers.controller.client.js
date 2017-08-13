(function () {
    angular
        .module("Palate")
        .controller("ProfileFollowersController", profileFollowersController);

    function profileFollowersController($routeParams, UserService) {
        var model = this;
        model.navUserId = $routeParams.userId;
        model.follow = follow;
        model.unfollow = unfollow;

        function init() {
            UserService.getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        model.user = user;
                        return UserService.findAllFollowers(model.navUserId);
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

    }
})();