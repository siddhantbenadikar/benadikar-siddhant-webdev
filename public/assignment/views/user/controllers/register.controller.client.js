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
            if(!user) {
                model.errorMessage = "Please enter details";
                return;
            }
            var _user = UserService.findUserByUsername(user.username);
            if(!_user) {
                if(user.password === user.verifyPassword) {
                    var user = UserService.createUser(user);
                    if(user) {
                        $location.url("/user/" + user._id);
                    } else {
                        model.errorMessage = "User not found"
                    }
                }
                else
                    model.errorMessage = "Passwords do not match"

            } else {
                model.errorMessage = "User already exists";
            }
        }

    }
})();