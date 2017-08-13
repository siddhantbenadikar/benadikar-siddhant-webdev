(function () {

    angular
        .module('Palate')
        .factory('UserService', UserService);

    function UserService($rootScope, $http) {

        var baseAdminUrl = "/pal/admin/user";
        var baseUserUrl = "/pal/user/";
        var api = {
            logout: logout,
            register: register,

            createUserByAdmin: createUserByAdmin,
            deleteUserByAdmin: deleteUserByAdmin,
            findAllUsersForAdmin: findAllUsersForAdmin,
            updateUserByAdmin: updateUserByAdmin,

            findUserByUsername: findUserByUsername,
            getAllUsers: getAllUsers,
            findUserByCredentials: login,
            deleteUser: deleteUser,
            findAllFollowingUsers: findAllFollowingUsers,
            findAllFollowers: findAllFollowers,
            findAllLikedRestaurants: findAllLikedRestaurants,
            findUserById: findUserById,
            follow: follow,
            getCurrentUser: getCurrentUser,
            isFollowing: isFollowing,
            isLiked: isLiked,
            like: like,
            setCurrentUser: setCurrentUser,
            unfollow: unfollow,
            unlike: unlike,
            updateUser: updateUser
        };
        return api;

        function getAllUsers() {
            return $http.get("/pal/search/users");
        }

        function login(user) {
            return $http.post("/pal/login", user);
        }

        function logout() {
            var url = "/pal/logout";
            return $http.post(url);
        }

        function register(user) {
            var url = "/pal/register";
            return $http.post(url, user);
        }

        function createUserByAdmin(user) {
            var url = baseAdminUrl;
            return $http.post(url, user);
        }

        function deleteUserByAdmin(userId) {
            var url = baseAdminUrl + "/" + userId;
            return $http.delete(url);
        }

        function findAllUsersForAdmin() {
            var url = "/pal/admin/users";
            return $http.get(url);
        }

        function updateUserByAdmin(userId, user) {
            var url = baseAdminUrl + "/" + userId;
            return $http.put(url, user);
        }
        

        function updateUser(userId, user) {
            var url = baseUserUrl + userId;
            return $http.put(url, user);
        }

        function findUserById(userId) {
            var url = baseUserUrl + userId;
            return $http.get(url);
        }


        function findUserByUsername(username) {
            return $http.get("/pal/user?username=" + username);
        }
        
        
        function deleteUser(userId) {
            var url = baseUserUrl + userId;
            return $http.delete(url);
        }

        function findAllFollowingUsers(userId) {
            var url = baseUserUrl + userId + "/following";
            return $http.get(url);
        }

        function findAllFollowers(userId) {
            var url = baseUserUrl + userId + "/followers";
            return $http.get(url);
        }

        function findAllLikedRestaurants(userId) {
            var url = baseUserUrl + userId + "/likes";
            return $http.get(url);
        }
        
        function follow(userId, followId) {
            var url = baseUserUrl + userId + "/follow/" + followId;
            return $http.put(url);
        }

        function getCurrentUser() {
            var url = "/pal/loggedin";
            return $http.get(url);
        }

        function isFollowing(userId, followId) {
            var url = baseUserUrl + userId + "/isfollowing/" + followId;
            return $http.get(url);
        }

        function isLiked(userId, rid) {
            var url = baseUserUrl + userId + "/restaurant/" + rid + "/isLiked";
            return $http.get(url);
        }

        function like(userId, rid) {
            var url = baseUserUrl + userId + "/restaurant/" + rid + "/like";
            return $http.put(url);
        }
        
        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function unfollow(userId, unfollowId) {
            var url = baseUserUrl + userId + "/unfollow/" + unfollowId;
            return $http.put(url);
        }

        function unlike(userId, rid) {
            var url = baseUserUrl + userId + "/restaurant/" + rid + "/unlike";
            return $http.put(url);
        }
        
    }

})();