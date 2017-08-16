(function () {
    angular
        .module("Palate")
        .controller("HomeController", homeController);

    function homeController($location, $rootScope, RestaurantService) {
        var model = this;

        model.searchRestaurantsByLocation = searchRestaurantsByLocation;
        model.searchRestaurantsByName = searchRestaurantsByName;

        function init() {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                RestaurantService.findLocationByLatLng(lat, lng)
                    .then(function (response) {
                        var location = response.data.location;
                        var entityType = location.entity_type;
                        var entityId = location.entity_id;
                        entityId = entityId.toString();
                        return RestaurantService.searchRestaurantsByLocation(entityId, entityType);
                    })
                    .then(function (response) {
                        model.restaurants = response.data.restaurants;
                    });
            })
        }init();

        function searchRestaurantsByLocation(location) {
            $rootScope.location = location;
            $location.url("/search/location");
        }

        function searchRestaurantsByName(name) {
            $rootScope.name = name;
            $location.url("/search/name");
        }

    }
})();