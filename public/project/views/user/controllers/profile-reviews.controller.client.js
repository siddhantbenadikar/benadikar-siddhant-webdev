
(function () {
    angular
        .module('Palate')
        .controller('ProfileReviewsController', profileReviewsController);

    function profileReviewsController($routeParams, UserService, ReviewService) {

        var model = this;
        model.navUserId = $routeParams.userId;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        model.user = user;
                        return ReviewService.findAllReviewsForUserId(model.navUserId);
                    }
                })
                .then(function (response) {
                    var reviews = response.data;
                    if (reviews) {
                        model.reviews = reviews;

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

    }

})();