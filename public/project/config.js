(function () {
    angular
        .module("Palate")
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
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
            .when("/search/name", {
                templateUrl: "views/search/searchby-name.view.client.html",
                controller: "SearchByNameController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/search/location", {
                templateUrl: "views/search/searchby-location.view.client.html",
                controller: "SearchByLocationController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/user/:userId", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/followers", {
                templateUrl: "views/user/templates/profile-followers.view.client.html",
                controller: "ProfileFollowersController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/following", {
                templateUrl: "views/user/templates/profile-following.view.client.html",
                controller: "ProfileFollowingController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/reviews", {
                templateUrl: "views/user/templates/profile-reviews.view.client.html",
                controller: "ProfileReviewsController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/likes", {
                templateUrl: "views/user/templates/profile-likes.view.client.html",
                controller: "ProfileLikesController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/poc", {
                templateUrl: "views/poc/templates/poc.view.client.html",
                controller: "PocController",
                controllerAs: "model"
            })
            .when("/restaurant/details/:rid", {
                templateUrl: "views/details/templates/details.view.client.html",
                controller: "DetailsController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/search/users", {
                templateUrl: "views/user/templates/search-users.view.client.html",
                controller: "SearchUsersController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
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

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(function (response) {
                var user = response.data;
                UserService.setCurrentUser(user);
                deferred.resolve();
            });
        return deferred.promise;
    }

})();