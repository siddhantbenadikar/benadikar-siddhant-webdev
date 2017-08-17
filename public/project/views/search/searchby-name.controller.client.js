(function () {
    angular
        .module("Palate")
        .controller("SearchByNameController", searchByNameController);

    function searchByNameController(RestaurantService, $routeParams, $location) {
        var model = this;
        model.restaurantTitle = $routeParams.name;

        model.searchRestaurantsByLocation = searchRestaurantsByLocation;
        model.searchRestaurantsByName = searchRestaurantsByName;

        function init() {
            RestaurantService.findByRestaurantName(model.restaurantTitle)
                .then(function (response) {
                    model.restaurants = response.data.restaurants;
                });
        }init();

        function searchRestaurantsByLocation(location) {
            $location.url("/search/location/" + location);
        }

        function searchRestaurantsByName(name) {
            $location.url("/search/name/" + name);
        }

    }
})();