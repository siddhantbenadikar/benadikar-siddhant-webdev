(function () {
    angular
        .module("Palate")
        .service("RestaurantService", restaurantService);

    function restaurantService($http) {
        this.addRestaurant = addRestaurant;
        this.findLocation = findLocation;
        this.findByRestaurantName = findByRestaurantName;
        this.searchRestaurantsByLocation = searchRestaurantsByLocation;
        this.searchRestaurantById = searchRestaurantById;
        this.findLocationByLatLng = findLocationByLatLng;
        
        function addRestaurant(restaurant) {
            return $http.post('/pal/restaurant', restaurant);
        }

        function findLocationByLatLng(lat, lng) {
            return $http.get("/pal/location?lat=" + lat + "&lng=" + lng);
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

        function findByRestaurantName(restaurantName) {
            return $http.get("/pal/restaurant/name/" + restaurantName)
        }
    }
})();