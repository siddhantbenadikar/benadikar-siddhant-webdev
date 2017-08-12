(function () {
    angular
        .module("Palate")
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/followers", {
                templateUrl: "views/user/templates/profile-followers.view.client.html",
                controller: "ProfileFollowersController",
                controllerAs: "model"
            })
            .when("/user/following", {
                templateUrl: "views/user/templates/profile-following.view.client.html",
                controller: "ProfileFollowingController",
                controllerAs: "model"
            })
            .when("/user/reviews", {
                templateUrl: "views/user/templates/profile-reviews.view.client.html",
                controller: "ProfileReviewsController",
                controllerAs: "model"
            })
            .when("/user/likes", {
                templateUrl: "views/user/templates/profile-likes.view.client.html",
                controller: "ProfileLikesController",
                controllerAs: "model"
            })
            .when("/poc", {
                templateUrl: "views/poc/templates/poc.view.client.html",
                controller: "PocController",
                controllerAs: "model"
            })
            .when("/details/:rid", {
                templateUrl: "views/details/templates/details.view.client.html",
                controller: "DetailsController",
                controllerAs: "model"
            });
    }

    function checkLoggedIn($q, UserService, $location) {
        var defer = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                if(user) {
                    UserService.setCurrentUser(user);
                    defer.resolve(user);
                } else {
                    defer.reject();
                    $location.url('/');
                }
            });
        return defer.promise;
    }

})();