(function () {
    angular
        .module("Palate")
        .controller("SearchByLocationController", searchByLocationController);

    function searchByLocationController(RestaurantService, $routeParams, $location) {
        var model = this;
        model.restaurantLocation = $routeParams.locationName;

        model.searchRestaurantsByLocation = searchRestaurantsByLocation;
        model.searchRestaurantsByName = searchRestaurantsByName;

        function init() {
            RestaurantService.findLocation(model.restaurantLocation)
                .then(function (response) {
                    var locationSuggestions = response.data.location_suggestions;
                    var entityType = locationSuggestions[0].entity_type;
                    var entityId = locationSuggestions[0].entity_id;
                    entityId = entityId.toString();
                    return RestaurantService.searchRestaurantsByLocation(entityId, entityType);
                })
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