(function () {
    angular
        .module("Palate")
        .service("RestaurantService", restaurantService);

    function restaurantService($http) {
        this.findLocation = findLocation;
        this.searchRestaurantsByLocation = searchRestaurantsByLocation;
        this.searchRestaurantById = searchRestaurantById;

        var USER_KEY = "ab0bf5a65624e10925ce1720007a332";

        function findLocation(query) {
            var url = "https://developers.zomato.com/api/v2.1/locations?query=" + query;
            return  $http.get(url,{"user-key" : "ab0bf5a65624e10925ce1720007a332"});
        }
        
        function searchRestaurantsByLocation(entityId) {
            var url = "https://developers.zomato.com/api/v2.1/search?entity_id="+entityId.toString()+"&entity_type=city&sort=rating"
            return $http.get(url,{"user-key" : "ab0bf5a65624e10925ce1720007a332"});
        }

        function searchRestaurantById(rid) {
            var url = "https://developers.zomato.com/api/v2.1/restaurant?res_id="+rid;
            return $http.get(url,{"user-key" : "ab0bf5a65624e10925ce1720007a332"});
        }
    }
})();