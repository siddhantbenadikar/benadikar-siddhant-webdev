(function () {
    angular
        .module("Palate")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var model = this;
        model.registerUser = registerUser;

        function init() {

        }init();

        function registerUser(user) {
            if (validate(user)) {
                UserService
                    .register(user)
                    .then(function (response) {
                        var resUser = response.data;
                        if (resUser) {
                            UserService.setCurrentUser(resUser);
                            $location.url("/user/" + resUser._id);
                        }
                    }, function (error) {
                        if (error.status === 409)
                            model.errorMessage = "Username taken";
                        else
                            model.errorMessage = "Unable to create user";
                    });
            } else {
                model.errorMessage = "Please fill all details";
            }
        }

        function validate(user) {
            var f = true;
            if (user) {
                f = f && user.username;
                f = f && user.password;
                f = f && user.firstName;
                f = f && user.lastName;
                f = f && user.verifyPassword;
                if (user.password === user.verifyPassword)
                    f = f && true;
                else {
                    f = f && false;
                    model.error = "Passwords do not match"
                }
            }
            else {
                f = false;
            }
            return f;
        }

    }
})();