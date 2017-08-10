var mongoose = require('mongoose');
var q = require('q');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('Page', pageSchema);

pageModel.createPage = createPage;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

var websiteModel = require('../website/website.model.server');

function createPage(websiteId, page) {
    var defer = q.defer();
    page._website = websiteId;
    pageModel.create(page, function (err, page) {
        if (err)
            defer.reject(err);
        else {
            websiteModel.findWebsiteById(page._website)
                .then(function (website) {
                    website.pages.push(page._id);
                    website.save(function (err) {
                        if(err)
                            defer.reject(err);
                        else
                            defer.resolve(page);
                    });
                });
        }
    });
    return defer.promise;
}

function findPagesByWebsiteId(websiteId) {
    var defer = q.defer();
    pageModel.find({_website: websiteId}, function (err, pages) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(pages);
    });
    return defer.promise;
}

function findPageById(pageId) {
    var defer = q.defer();
    pageModel.findById(pageId, function (err, page) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(page);
    });
    return defer.promise;
}
// function findPageById(pageId) {
//     return pageModel.findById(pageId)
//         .populate('widgets')
//         .exec();
// }

function updatePage(pageId, page) {
    var defer = q.defer();
    pageModel.findByIdAndUpdate(pageId, page, function (err, page) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(page);
    });
    return defer.promise;
}

function deletePage(pageId) {
    var defer = q.defer();
    pageModel.findByIdAndRemove(pageId, function (err, page) {
        if(err)
            defer.reject(err);
        else {
            page.remove();
            defer.resolve(page);
        }
    });
    return defer.promise;
}
