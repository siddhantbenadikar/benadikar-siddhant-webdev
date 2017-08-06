(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);
        
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
                UserService.findUserByCredentials(user.username, user.password)
                    .then(function (response) {
                        user = response.data;
                        if(user === null)
                            model.errorMessage = "User not found"
                        else
                            $location.url("/user/" + user._id);
                    });
            }

        }
    }
)();