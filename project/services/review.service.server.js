module.exports = function (app) {

    var q = require('q');
    var reviewModel = require('../model/review/review.model.server');
    var restaurantModel = require('../model/restaurant/restaurant.model.server');

    app.post('/pal/user/:userId/restaurant/:rid', addReview);
    app.get('/pal/restaurant/:rid/reviews', findAllReviewsForRestaurantId);
    app.get('/pal/user/:userId/reviews', findAllReviewsForUserId);
    app.put('/pal/review/:reviewId', updateReview);
    app.delete('/pal/review/:reviewId', deleteReview);

    function addReview(req, res) {
        var userId = req.params.userId;
        var rid = req.params.rid;
        var review = req.body;
        reviewModel.addReview(userId, rid, review)
            .then(function (review) {
                res.json(review);
            }, function (error) {
                res.status(500).send(err);
            });
    }

    function findAllReviewsForRestaurantId(req, res) {
        var rid = req.params.rid;
        reviewModel.findAllReviewsForRestaurantId(rid)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllReviewsForUserId(req, res) {
        var userId = req.params.userId;
        reviewModel.findAllReviewsForUserId(userId)
            .then(function (reviews) {
                var promiseArray = [];
                var result = [];
                reviews.forEach(function (review, index, array) {
                    promiseArray.push(restaurantModel
                            .findRestaurantByRestaurantId(review.rid)
                            .then(function (restaurant) {
                                if (restaurant) {
                                    var jsonStringNew = JSON.stringify(review);
                                    var newReview = JSON.parse(jsonStringNew);
                                    newReview.restaurant = restaurant;
                                    result.push(newReview);
                                }
                            }, function (err) {
                                console.log(err);
                            }));
                });
                q.all(promiseArray)
                    .then(function () {
                        res.json(result);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;
        reviewModel
            .updateReview(reviewId, review)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel
            .deleteReview(reviewId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }


};