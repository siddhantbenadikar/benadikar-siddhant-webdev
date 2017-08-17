(function () {

    angular
        .module("Palate")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var model = this;

        model.predicate = 'username';
        model.reverse = true;

        model.add = add;
        model.order = order;
        model.remove = remove;
        model.select = select;
        model.update = update;

        model.clear = clear;

        function init() {
            model.selected = -1;
            UserService.findAllUsersForAdmin()
                .then(handleSuccess, handleFailure);
        }init();

        function add(user) {
            if (user) {
                if(user.username) {
                    UserService.createUserByAdmin(user)
                        .then(handleSuccess, handleFailure);
                } else {
                    model.error = "Please enter username";
                }
            } else {
                model.error = "Please enter user details";
            }
        }

        function order(predicate) {
            model.reverse = (model.predicate === predicate) ? !model.reverse : false;
            model.predicate = predicate;
        }

        function remove(user) {
            UserService.deleteUserByAdmin(user._id)
                .then(handleSuccess, handleFailure);
        }

        function select(user) {
            model.inputUser = angular.copy(user);
            model.selected = 0;
        }

        function update(user) {
            if(user.role === 'user' || user.role === 'admin') {
                UserService.updateUserByAdmin(user._id, user)
                    .then(handleSuccess, handleFailure);
            } else {
                model.error = "Invalid role";
            }
        }

        function handleSuccess(response) {
            model.success = "User data ready";
            model.users = response.data;
            model.inputUser = {};
            model.selected = -1;
            model.error = null;
        }

        function handleFailure(error) {
            if (error.status === 409)
                model.error = "Username already taken";
            else
                model.error = "Unable to create user";
        }

        function clear() {
            model.error = "";
            model.success = "";
        }
    }
})();