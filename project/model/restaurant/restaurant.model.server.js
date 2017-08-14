
var mongoose = require('mongoose');
var q = require('q');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('PalateRestaurant', restaurantSchema);


restaurantModel.addRestaurant = addRestaurant;
restaurantModel.findRestaurantById = findRestaurantById;
restaurantModel.findRestaurantByRestaurantId = findRestaurantByRestaurantId;
restaurantModel.findAllLikedRestaurants = findAllLikedRestaurants;
restaurantModel.deleteRestaurantById = deleteRestaurantById;
restaurantModel.deleteRestaurantByRestaurantId = deleteRestaurantByRestaurantId;

module.exports = restaurantModel;

function addRestaurant(restaurant) {
    var defer = q.defer();
    restaurant.rid = restaurant.id.toString();
    restaurantModel.create(restaurant, function (err, restaurant){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(restaurant);
        }
    });
    return defer.promise;
}

function findRestaurantById(id) {
    var defer = q.defer();
    restaurantModel.findById(id, function(err, restaurant){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(restaurant);
        }
    });
    return defer.promise;
}


function findRestaurantByRestaurantId(rid) {
    var defer = q.defer();
    restaurantModel.findOne({rid: rid}, function(err, restaurant){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(restaurant);
        }
    });
    return defer.promise;
}


function findAllLikedRestaurants(rids) {
    var defer = q.defer();
    restaurantModel.find({rid: {$in: rids}}, function(err, restaurants){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(restaurants);
        }
    });
    return defer.promise;
}

function deleteRestaurantById(id) {

    var defer = q.defer();
    restaurantModel.remove({_id: id}, function(err, restaurant){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(restaurant);
        }
    });
    return defer.promise;
}

function deleteRestaurantByRestaurantId(rid) {
    var defer = q.defer();
    restaurantModel.remove({rid: rid}, function(err, restaurant){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(restaurant);
        }
    });
    return defer.promise;
}

