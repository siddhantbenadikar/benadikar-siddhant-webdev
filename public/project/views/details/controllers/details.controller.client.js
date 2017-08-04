(function () {
    angular
        .module("Palate")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, RestaurantService) {
        var model = this;

        var rid = $routeParams["rid"];

        function init() {
            RestaurantService.searchRestaurantById(rid)
                .then(function (response) {
                    model.restaurant = response.data;
                });
        }init();
    }
})();