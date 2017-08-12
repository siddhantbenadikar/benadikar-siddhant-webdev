(function() {

    angular
        .module("Palate")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService, checkLoggedIn) {
        var model = this;
        var userId = checkLoggedIn._id;

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init() {
            UserService.findUserById(userId)
                .then(function(response) {
                    model.user = response.data;
                });
        }init();

        function updateUser(user) {
            UserService.updateUser(user._id, user);
            model.message = "Updated successfully"
        }

        function unregister(user) {
            UserService.setCurrentUser(null);
            UserService.deleteUser(user._id);
            $location.url("/login");
        }
    }
})();