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
                if(user === undefined || user.username === undefined || user.password === undefined) {
                    model.errorMessage = "Please enter username and password";
                    return;
                }
                UserService.login(user)
                    .then(function (response) {
                        user = response.data;
                        var status = response.status;
                        if(status === 401)
                            model.errorMessage = "User not found";
                        else
                            UserService.setCurrentUser(user);
                            $location.url("/user/" + user._id);
                    });
            }

        }
    }
)();