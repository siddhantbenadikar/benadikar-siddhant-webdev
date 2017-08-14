(function () {
    angular
        .module("Palate")
        .service("RestaurantService", restaurantService);

    function restaurantService($http) {
        this.addRestaurant = addRestaurant;
        this.findLocation = findLocation;
        this.searchRestaurantsByLocation = searchRestaurantsByLocation;
        this.searchRestaurantById = searchRestaurantById;
        
        function addRestaurant(restaurant) {
            return $http.post('/pal/restaurant', restaurant);
        }

        function findLocation(location) {
            return $http.get("/pal/location/" + location);
        }

        function searchRestaurantsByLocation(entityId, entityType) {
            return $http.get("/pal/restaurant/search?entityId=" + entityId + "&entityType=" + entityType);
        }

        function searchRestaurantById(rid) {
            return $http.get("/pal/restaurant/" + rid);
        }
    }
})();