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
                RestaurantService.searchRestaurantByLatLng(lat, lng)
                    .then(function (response) {
                        model.restaurants = response.data.restaurants;
                    });
            })
        }init();

        function searchRestaurantsByLocation(location) {
            $location.url("/search/location/" + location);
        }

        function searchRestaurantsByName(name) {
            $location.url("/search/name/" + name);
        }

    }
})();