(function () {
    angular
        .module("Palate")
        .service("RestaurantService", restaurantService);

    function restaurantService($http) {
        this.findLocation = findLocation;
        this.searchRestaurantsByLocation = searchRestaurantsByLocation;
        this.searchRestaurantById = searchRestaurantById;

        function findLocation(location) {
            return $http.get("/api/location/" + location);
        }

        function searchRestaurantsByLocation(entityId, entityType) {
            return $http.get("/api/restaurant?entityId=" + entityId + "&entityType=" + entityType);
        }

        function searchRestaurantById(rid) {
            return $http.get("/api/restaurant/" + rid);
        }

        // function findLocation(query) {
        //     var url = "https://developers.zomato.com/api/v2.1/locations?query=" + query;
        //     return  $http.get(url, {headers: {"key" : USER_KEY}});
        // }
        //
        // function searchRestaurantsByLocation(entityId) {
        //     var url = "https://developers.zomato.com/api/v2.1/search?entity_id="+entityId.toString()+"&entity_type=city&sort=rating"
        //     return  $http.get(url, {headers: {"key" : USER_KEY}});
        // }
        //
        // function searchRestaurantById(rid) {
        //     var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id="+rid;
        //     return  $http.get(url, {headers: {"key" : USER_KEY}});
        // }
    }
})();