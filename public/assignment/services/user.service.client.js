(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);
    
    function userService($http) {

        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByCredentials": findUserByCredentials,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        }
        return api;

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/" + userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }

    }
})();
