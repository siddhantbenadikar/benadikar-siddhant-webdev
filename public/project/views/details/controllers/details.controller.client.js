
(function () {

    angular
        .module('Palate')
        .controller('DetailsController', DetailsController);

    function DetailsController($routeParams, $sce, RestaurantService, ReviewService, UserService) {

        var model = this;
        model.rid = $routeParams.rid;

        var GEO_API_KEY = "AIzaSyDmjkyUIuqFhtjJHInVo848M68jhB4fWxA";

        model.addReview = addReview;
        model.selectReview = selectReview;
        model.updateReview = updateReview;
        model.deleteReview = deleteReview;
        model.cancelReview = cancelReview;
        model.likeRestaurant = likeRestaurant;
        model.unlikeRestaurant = unlikeRestaurant;
        model.clear = clear;

        function init() {
            $('[data-toggle="tooltip"]').tooltip();

            model.review = {
                "rating": 0,
                "title": "",
                "description": ""
            };

            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        model.user = user;
                        UserService
                            .findUserById(model.user._id)
                            .then(function (response) {
                                if (response.data) {
                                    model.user = response.data;
                                }
                            });
                    }
                });

            RestaurantService.searchRestaurantById(model.rid)
                .then(function (response) {
                    model.restaurant = response.data;
                    model.zomatoRating = model.restaurant.user_rating.aggregate_rating;
                    var lat = response.data.location.latitude;
                    var lng = response.data.location.longitude;
                    model.mapUrl = "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&zoom=15&size=2000x300&maptype=roadmap&markers=color:red|"+lat+","+lng+"&key=" + GEO_API_KEY;
                });

            findAllReviewsForRestaurantId();
        }

        if (model.rid) {
            init();
        }

        function restaurantAvgRatingByRestaurantId() {
            var avgRating = 0;
            for (var i = 0; i < model.reviews.length; i++) {
                avgRating += parseInt(model.reviews[i].rating);
            }
            model.avgRating = (avgRating / model.reviews.length);
            if (isNaN(model.avgRating)) {
                model.avgRating = 0;
            }
        }


        function findAllReviewsForRestaurantId() {
            ReviewService
                .findAllReviewsForRestaurantId(model.rid)
                .then(function (response) {
                    if (response.data) {
                        model.reviews = response.data;
                        findUserByReviewUserId();
                        restaurantAvgRatingByRestaurantId();
                        isLiked();
                    }
                });
        }

        function addReview(review) {
            // model.restaurant.imageUrl = model.imageUrl;
            ReviewService
                .addReview(model.user._id, model.rid, review)
                .then(function (response) {
                    if (response.data) {
                        // model.success = "Review added!";
                        model.selectedIndex = -1;
                        model.review = {};
                        model.reviews.push(response.data);
                        findUserByReviewUserId();
                        restaurantAvgRatingByRestaurantId();
                        return RestaurantService.addRestaurant(model.restaurant);
                    }
                }, function (err) {
                    // model.alert = err;
                })
                .then(function (response) {
                    console.log("success!");
                }, function (err) {
                    console.log(err);
                });
        }

        function selectReview(index) {
            model.selectedIndex = index;
            var editReview = {
                "_id": model.reviews[index]["_id"],
                "title": model.reviews[index]["title"],
                "description": model.reviews[index]["description"],
                "timestamp": model.reviews[index]["timestamp"],
                "rid": model.reviews[index]["rid"],
                "_user": model.reviews[index]["_user"],
                "rating": model.reviews[index]["rating"]
            };
            model.editReview = editReview;
        }

        function updateReview(review) {
            ReviewService
                .updateReview(review._id, review)
                .then(function (response) {
                    var status = response.data;
                    model.reviews[model.selectedIndex] = review;
                    model.selectedIndex = -1;
                    model.review = {};
                    findUserByReviewUserId();
                    restaurantAvgRatingByRestaurantId();
                }, function (err) {
                });
        }

        function deleteReview(index) {
            var reviewId = model.reviews[index]._id;
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    var status = response.data;
                    model.reviews.splice(index, 1);
                    model.selectedIndex = -1;
                    model.review = {};
                    findUserByReviewUserId();
                    restaurantAvgRatingByRestaurantId();
                }, function (err) {
                });
        }

        function cancelReview() {
            model.selectedIndex = -1;
        }

        function findUserByReviewUserId() {
            model.reviews.forEach(function (element, index, array) {
                UserService.findUserById(model.reviews[index]._user)
                    .then(function (response) {
                        if (response.data) {
                            model.reviews[index].userFirstName = response.data.firstName;
                            model.reviews[index].imgUrl = response.data.imgUrl;
                        }
                    });
            });
        }

        function likeRestaurant() {
            // model.restaurant.imageUrl = model.imageUrl;
            UserService
                .like(model.user._id, model.rid)
                .then(function (response) {
                    var status = response.data;
                    model.isLiked = true;
                    return RestaurantService.addRestaurant(model.restaurant);
                }, function (err) {
                })
                .then(function (response) {
                }, function (err) {
                });
        }

        function unlikeRestaurant() {
            UserService
                .unlike(model.user._id, model.rid)
                .then(function (response) {
                    var status = response.data;
                    model.isLiked = false;
                }, function (err) {
                });
        }

        function isLiked() {
            if (model.user) {
                model.isLiked = (model.user.restaurantLikes.indexOf(model.rid) > -1);
            } else {
                model.isLiked = false;
            }
        }

        function clear() {
            model.success = "";
            model.alert = "";
        }

    }

})();