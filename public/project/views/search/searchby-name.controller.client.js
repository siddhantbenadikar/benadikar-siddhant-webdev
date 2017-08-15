(function () {
    angular
        .module("Palate")
        .controller("SearchByNameController", searchByNameController);

    function searchByNameController(RestaurantService, $rootScope, $route, $location) {
        var model = this;
        model.restaurantTitle = $rootScope.name;

        model.searchRestaurantsByLocation = searchRestaurantsByLocation;
        model.searchRestaurantsByName = searchRestaurantsByName;

        function init() {
            RestaurantService.findByRestaurantName($rootScope.name)
                .then(function (response) {
                    model.restaurants = response.data.restaurants;
                });
        }init();

        function searchRestaurantsByLocation(location) {
            $rootScope.location = location;
            $location.url("/search/name");
        }

        function searchRestaurantsByName(name) {
            $rootScope.name = name;
            $route.reload();
        }

    }
})();