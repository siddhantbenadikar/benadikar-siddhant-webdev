
(function () {

    angular
        .module('Palate')
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
            var url = "/pal/user/" + userId + "/movie/" + movieId;
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/pal/review/" + reviewId;
            return $http.delete(url);
        }

        function findAllReviewsForMovieId(movieId) {
            var url = "/pal/movie/" + movieId + "/reviews";
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