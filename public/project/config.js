(function () {
    angular
        .module("Palate")
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/details/:rid", {
                templateUrl: "views/details/templates/details.view.client.html",
                controller: "DetailsController",
                controllerAs: "model"
            });
    }
})();