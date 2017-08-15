(function () {
    angular
        .module("Palate")
        .controller("SearchByLocationController", searchByLocationController);

    function searchByLocationController(RestaurantService, $rootScope, $route, $location) {
        var model = this;
        model.restaurantLocation = $rootScope.location;

        model.searchRestaurantsByLocation = searchRestaurantsByLocation;
        model.searchRestaurantsByName = searchRestaurantsByName;

        function init() {
            RestaurantService.findLocation($rootScope.location)
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
            $rootScope.location = location;
            $route.reload();
        }

        function searchRestaurantsByName(name) {
            $rootScope.name = name;
            $location.url("/search/name");
        }

    }
})();