
(function () {

    angular
        .module('Palate')
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {

        var api = {
            addReview: addReview,
            deleteReview: deleteReview,
            findAllReviewsForRestaurantId: findAllReviewsForRestaurantId,
            findAllReviewsForUserId: findAllReviewsForUserId,
            updateReview: updateReview
        };
        return api;

        function addReview(userId, rid, review) {
            var url = "/pal/user/" + userId + "/restaurant/" + rid;
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/pal/review/" + reviewId;
            return $http.delete(url);
        }

        function findAllReviewsForRestaurantId(rid) {
            var url = "/pal/restaurant/" + rid + "/reviews";
            return $http.get(url);
        }

        function findAllReviewsForUserId(userId) {
            var url = "/pal/user/" + userId + "/reviews";
            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/pal/review/" + reviewId;
            return $http.put(url, review);
        }

    }

})();