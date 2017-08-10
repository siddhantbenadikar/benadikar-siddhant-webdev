var mongoose = require('mongoose');
var q = require('q');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('Website', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

var userModel = require('../user/user.model.server');

function createWebsite(userId, website) {
    var defer = q.defer();
    website._user = userId;
    websiteModel.create(website, function (err, website) {
        if (err)
            defer.reject(err);
        else {
            userModel.findUserById(website._user)
                .then(function (user) {
                    user.websites.push(website._id);
                    user.save(function (err) {
                        if(err)
                            defer.reject(err);
                        else
                            defer.resolve(website);
                    });
            });
        }
    });
    return defer.promise;
}

function findWebsitesByUser(userId) {
    var defer = q.defer();
    websiteModel.find({_user: userId}, function (err, website) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(website);
    });
    return defer.promise;
}

function findWebsiteById(websiteId) {
    var defer = q.defer();
    websiteModel.findById(websiteId, function (err, website) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(website);
    });
    return defer.promise;
}

function updateWebsite(websiteId, website) {
    var defer = q.defer();
    websiteModel.findByIdAndUpdate(websiteId, website, function (err, website) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(website);
    });
    return defer.promise;
}

function deleteWebsite(websiteId) {
    var defer = q.defer();
    websiteModel.findByIdAndRemove(websiteId, function (err, website) {
        if(err)
            defer.reject(err);
        else
            website.remove();
            defer.resolve(website);
    });
    return defer.promise;
}
