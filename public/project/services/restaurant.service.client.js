(function () {
    angular
        .module("Palate")
        .service("RestaurantService", restaurantService);

    function restaurantService($http) {
        this.findLocation = findLocation;
        this.searchRestaurantsByLocation = searchRestaurantsByLocation;
        this.searchRestaurantById = searchRestaurantById;

        function findLocation(location) {
            return $http.get("/pal/location/" + location);
        }

        function searchRestaurantsByLocation(entityId, entityType) {
            return $http.get("/pal/restaurant?entityId=" + entityId + "&entityType=" + entityType);
        }

        function searchRestaurantById(rid) {
            return $http.get("/pal/restaurant/" + rid);
        }
    }
})();