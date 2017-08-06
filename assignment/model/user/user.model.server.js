var mongoose = require('mongoose');
var q = require('q');
var userSchema = require('./user.schema.server');
var db = require("../models.server");
var userModel = mongoose.model('User', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

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