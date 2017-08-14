
var mongoose = require('mongoose');
var q = require('q');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('PalateReview', reviewSchema);

reviewModel.addReview = addReview;
reviewModel.findAllReviewsForRestaurantId = findAllReviewsForRestaurantId;
reviewModel.findAllReviewsForUserId = findAllReviewsForUserId;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;

module.exports = reviewModel;


function addReview(userId, rid, review) {
    var defer = q.defer();
    review._user = userId;
    review.rid = rid;
    reviewModel.create(review, function (err, review){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(review);
        }
    });
    return defer.promise;
}


function findAllReviewsForRestaurantId(rid) {
    var defer = q.defer();
    reviewModel.find({rid: rid}, function (err, reviews){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(reviews);
        }
    });
    return defer.promise;
}


function findAllReviewsForUserId(userId) {
    var defer = q.defer();
    reviewModel.find({_user: userId}, function(err, reviews){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(reviews);
        }
    });
    return defer.promise;
}

function updateReview(reviewId, review) {
    var defer = q.defer();
    delete review._id;
    review.timestamp = Date.now();
    reviewModel.update({_id: reviewId}, {$set: review}, function(err, review){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(review);
        }
    });
    return defer.promise;
}

function deleteReview(reviewId) {
    var defer = q.defer();
    reviewModel.remove({_id: reviewId}, function(err, review){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(review);
        }
    });
    return defer.promise;
}

