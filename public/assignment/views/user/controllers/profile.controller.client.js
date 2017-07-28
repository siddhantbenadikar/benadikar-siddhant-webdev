(function() {

    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var model = this;
        var userId = $routeParams['uid'];

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
            UserService.deleteUser(user._id);
            $location.url("/login");
        }
    }
})();