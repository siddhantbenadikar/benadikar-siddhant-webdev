(function () {
    angular
        .module("Palate")
        .controller("HomeController", homeController);

    function homeController($location, $rootScope) {
        var model = this;

        model.searchRestaurantsByLocation = searchRestaurantsByLocation;
        model.searchRestaurantsByName = searchRestaurantsByName;

        function init() {

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