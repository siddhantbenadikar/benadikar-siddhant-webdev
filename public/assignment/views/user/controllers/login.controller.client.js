(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController)
        
        function loginController($location, UserService) {
            var model = this;
            model.login = login;
            
            function init() {

            } init();
            
            function login(user) {
                if(!user) {
                    model.errorMessage = "Please enter username and password";
                    return;
                }
                user = UserService.findUserByCredentials(user.username, user.password);
                if(user) {
                    $location.url("/user/" + user._id);
                } else {
                    model.errorMessage = "User not found"
                }
            }

        }

    }
)();