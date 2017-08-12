(function () {

    angular
        .module('Palate')
        .controller('HeaderController', HeaderController);

    function HeaderController($location, UserService) {

        var model = this;

        model.toggleMenu = toggleMenu;
        model.logout = logout;
        model.home = home;

        function init() {

        }

        init();

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }

        function logout() {
            UserService.logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $location.url("/");
                });
        }

        function home() {
            $location.url("/");
        }

    }

})();