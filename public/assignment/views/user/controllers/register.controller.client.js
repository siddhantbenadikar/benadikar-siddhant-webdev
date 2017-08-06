(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);
    
    function registerController($location, UserService) {
        var model = this;
        model.registerUser = registerUser;

        function init() {

        }init();

        function registerUser(user) {
            if (!user) {
                model.errorMessage = "Please enter details";
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
                    $location.url("/user/" + _user._id);
                });
        }

    }
})();