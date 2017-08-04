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
                    var entityId = response.data.entity_id;
                    return RestaurantService.searchRestaurantsByLocation(entityId);
                })
                .then(function (response) {
                    model.restaurants = response.data.restaurants;
                });
        }

    }
})();