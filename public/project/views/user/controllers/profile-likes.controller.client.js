
(function () {

    angular
        .module('Palate')
        .controller('ProfileLikesController', profileLikesController);

    function profileLikesController($routeParams, UserService) {

        var model = this;
        model.navUserId = $routeParams.userId;

        model.like = like;
        model.unlike = unlike;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        model.user = user;
                        isAlreadyFollowing();
                        return UserService.findAllLikedRestaurants(model.navUserId);
                    }
                })
                .then(function (response) {
                    var restaurants = response.data;
                    if (restaurants) {
                        isRestaurantLiked(restaurants);
                        UserService
                            .findUserById(model.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    model.navUser = user;
                                }
                            });
                    }
                });
        }

        init();

        function isRestaurantLiked(restaurants) {

            restaurants.forEach(function (restaurant, index, array) {
                restaurant.isLiked = (model.user.restaurantLikes.indexOf(restaurant.rid) > -1);
            });

            model.restaurants = restaurants;

        }

        function isAlreadyFollowing() {
            model.alreadyFollowing = (model.user.following.indexOf(model.navUserId) > -1);
        }

        function like(index) {
            var rid = model.restaurants[index].rid;
            UserService
                .like(model.user._id, rid)
                .then(function (response) {
                    var status = response.data;
                    model.restaurants[index].isLiked = true;
                });
        }

        function unlike(index) {
            var rid = model.restaurants[index].rid;
            UserService
                .unlike(model.user._id, rid)
                .then(function (response) {
                    var status = response.data;
                    model.restaurants[index].isLiked = false;
                });
        }

    }

})();