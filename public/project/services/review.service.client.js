/**
 * Created by Tridiv on 04-04-2017.
 */
(function () {

    angular
        .module('MovieAppMaker')
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {

        var api = {
            addReview: addReview,
            deleteReview: deleteReview,
            findAllReviewsForMovieId: findAllReviewsForMovieId,
            findAllReviewsForUserId: findAllReviewsForUserId,
            updateReview: updateReview
        };
        return api;

        function addReview(userId, movieId, review) {
            var url = "/rmm/user/" + userId + "/movie/" + movieId;
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/rmm/review/" + reviewId;
            return $http.delete(url);
        }

        function findAllReviewsForMovieId(movieId) {
            var url = "/rmm/movie/" + movieId + "/reviews";
            return $http.get(url);
        }

        function findAllReviewsForUserId(userId) {
            var url = "/rmm/user/" + userId + "/reviews";
            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/rmm/review/" + reviewId;
            return $http.put(url, review);
        }

    }

})();