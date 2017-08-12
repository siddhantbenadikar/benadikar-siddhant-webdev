var mongoose = require('mongoose');
var q = require('q');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('PalateUser', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserByFacebookId = findUserByFacebookId;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.likeRestaurant = likeRestaurant;
userModel.unlikeRestaurant = unlikeRestaurant;
userModel.isLiked = isLiked;
userModel.addFollower = addFollower;
userModel.addFollowing = addFollowing;
userModel.removeFollowing = removeFollowing;
userModel.removeFollower = removeFollower;
userModel.isFollowing = isFollowing;
userModel.findAllFollowingUsers = findAllFollowingUsers;
userModel.findAllFollowers = findAllFollowers;

module.exports = userModel;

function createUser(user) {
    var defer = q.defer();
    userModel.create(user, function (err, user) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(user);
    });
    return defer.promise;
}

function findAllUsers() {
    var defer = q.defer();
    userModel.find(function(err, users){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(users);
        }
    });
    return defer.promise;
}

function findUserById(userId) {
    var defer = q.defer();
    userModel.findById(userId, function (err, user) {
        if (err)
            defer.reject(err);
        else
            defer.resolve(user);
    });
    return defer.promise;
}

function findUserByUsername(username) {
    var defer = q.defer();
    userModel.findOne({username : username}, function (err, user) {
        if (err)
            defer.reject(err);
        else
            defer.resolve(user);
    });
    return defer.promise;
}

function findUserByCredentials(username, password) {
    var defer = q.defer();
    userModel.findOne({username: username, password: password}, function (err, user) {
        if (err)
            defer.reject(err);
        else
            defer.resolve(user);
    });
    return defer.promise;
}

function updateUser(userId, user) {
    var defer = q.defer();
    userModel.findByIdAndUpdate(userId, user, function (err, user) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(user);
    });
    return defer.promise;
}

function deleteUser(userId) {
    var defer = q.defer();
    userModel.findByIdAndRemove(userId, function (err, user) {
        if(err)
            defer.reject(err);
        else {
            user.remove();
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function findUserByFacebookId(facebookId) {
    var defer = q.defer();
    userModel.findOne({'facebook.id': facebookId}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function findUserByGoogleId(googleId) {
    var defer = q.defer();
    userModel.findOne({'google.id': googleId}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function likeRestaurant(userId, rid) {
    var defer = q.defer();
    userModel.update({_id: userId}, {$addToSet: {restaurantLikes: rid}}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function unlikeRestaurant(userId, rid) {
    var defer = q.defer();
    userModel.update({_id: userId}, {$pullAll: {restaurantLikes: [rid]}}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user); 
        }
    });
    return defer.promise;
}

function isLiked(userId, rid) {
    var defer = q.defer();
    userModel.findOne({_id: userId}, {$and: [{restaurantLikes: {$in: [rid]}}]}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function addFollower(userId, followerId) {
    var defer = q.defer();
    userModel.update({_id: userId}, {$addToSet: {followers: followerId}}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}


function addFollowing(userId, followingId) {
    var defer = q.defer();
    userModel.update({_id: userId}, {$addToSet: {following: followingId}}, function (err, user) {
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}


function removeFollowing(userId, followingId) {
    var defer = q.defer();
    userModel.update({_id: userId}, {$pullAll: {following: [followingId]}}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}



function removeFollower(userId, followerId) {
    var defer = q.defer();
    userModel.update({_id: userId}, {$pullAll: {followers: [followerId]}}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}


function isFollowing(userId, followId) {

    var defer = q.defer();
    userModel.findOne({_id: userId, following: {$in: [followId]}}, function(err, user){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(user);
        }
    });
    return defer.promise;
}

function findAllFollowingUsers(userIds) {

    var defer = q.defer();
    userModel.find({_id: {$in: userIds}}, function(err, users){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(users);
        }
    });
    return defer.promise;
}

function findAllFollowers(userIds) {

    var defer = q.defer();
    userModel.find({_id: {$in: userIds}}, function(err, users){
        if(err){
            defer.reject(err);
        }
        else{
            defer.resolve(users);
        }
    });
    return defer.promise;
}