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
            if (validate(user) === undefined) {
                model.errorMessage = "Please enter all details";
                return;
            }
            UserService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if (_user === "") {
                        if (user.password === user.verifyPassword)
                            return UserService.createUser(user);
                        else
                            model.errorMessage = "Passwords do not match"
                    }
                    else
                        model.errorMessage = "User already exists";
                })
                .then(function (response) {
                    _user = response.data;
                    UserService.setCurrentUser(_user);
                    $location.url("/user/" + _user._id);
                });
        }

        function validate(user) {
            var flag = true;

            if (user) {
                flag = flag && user.username;
                flag = flag && user.password;
                flag = flag && user.firstName;
                flag = flag && user.lastName;
                flag = flag && user.email;
            }
            else {
                flag = false;
            }

            return flag;

        }

    }
})();