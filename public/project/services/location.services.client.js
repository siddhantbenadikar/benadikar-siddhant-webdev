(function () {
    angular
        .module("Palate")
        .service("LocationService", locationService);

    function locationService($http) {
        this.getLatLonOfUser = getLatLonOfUser;

        var key = "AIzaSyAgdWsYGzeN3SHPR3HpMyaKmzS233k2Rc0";
        var urlBase = "https://www.googleapis.com/geolocation/v1/geolocate?key=" + key;

        function getLatLonOfUser() {
            return $http.get(urlBase)
        }

    }
})();