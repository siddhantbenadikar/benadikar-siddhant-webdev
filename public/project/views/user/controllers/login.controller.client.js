(function() {
        angular
            .module("Palate")
            .controller("LoginController", loginController);

        function loginController($location, UserService) {
            var model = this;
            model.login = login;
            // model.user = {};

            function init() {

            } init();

            function login(user) {
                if(!user) {
                    model.errorMessage = "Please enter username and password";
                    return;
                }
                UserService.findUserByCredentials(user)
                    .then(function (response) {
                        user = response.data;
                        if(user === null)
                            model.errorMessage = "User not found";
                        else
                            UserService.setCurrentUser(user);
                            $location.url("/user/" + user._id);
                    });
            }

        }
    }
)();