(function () {
    angular
        .module("Palate")
        .controller("HomeController", homeController);
    
    function homeController(RestaurantService) {
        var model = this;

        model.searchRestaurantsByLocation = searchRestaurantsByLocation;

        function init() {

        }init();

        function searchRestaurantsByLocation(location) {
            RestaurantService.findLocation(location)
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
        }

    }
})();