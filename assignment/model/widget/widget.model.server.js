var mongoose = require('mongoose');
var q = require('q');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('Widget', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

var pageModel = require('../page/page.model.server');

function createWidget(pageId, widget) {
    var defer = q.defer();
    widget._page = pageId;
    widgetModel.create(widget, function (err, widget) {
        if(err)
            defer.reject(err);
        else {
            pageModel.findPageById(widget._page)
                .then(function (page) {
                    page.widgets.push(widget._id);
                    page.save(function (err) {
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

// function findWidgetsByPageId(pageId) {
//     var defer = q.defer();
//     widgetModel.find({"_page": pageId}, function (err, widgets) {
//         if(err)
//             defer.reject(err);
//         else
//             defer.resolve(widgets);
//     });
//     return defer.promise;
// }
function findWidgetsByPageId(pageId) {
    var defer = q.defer();
    pageModel.findById(pageId)
        .populate('widgets')
        .exec(function (err, page) {
            if(err)
                defer.reject(err);
            else
                defer.resolve(page);
        });
    return defer.promise;
}

function findWidgetById(widgetId) {
    var defer = q.defer();
    widgetModel.findById(widgetId, function (err, widget) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(widget);
    });
    return defer.promise;
}

function updateWidget(widgetId, widget) {
    var defer = q.defer();
    widgetModel.findByIdAndUpdate(widgetId, widget, function (err, widget) {
        if(err)
            defer.reject(err);
        else
            defer.resolve(widget);
    });
    return defer.promise;
}

function deleteWidget(widgetId) {
    var defer = q.defer();
    widgetModel.findByIdAndRemove(widgetId, function (err, widget) {
        if(err)
            defer.reject(err);
        else
            widget.remove();
            defer.resolve(widget);
    });
    return defer.promise;
}

function reorderWidget(pageId, start, end) {
    return pageModel.findPageById(pageId)
        .then(function (page) {
            widgets = page.widgets;
            widgets.splice(end, 0, widgets.splice(start, 1)[0]);
            page.widgets = widgets;
            return page.save();
        })
}

// function createWidget(pageId, widget) {
//     var defer = q.defer();
//     widget._page = pageId;
//     widgetModel.findOne({_page: pageId})
//         .sort('-position')
//         .exec(function (err, lastWidget) {
//             if(lastWidget)
//                 widget.position = lastWidget.position+1;
//             else
//                 widget.position = 0;
//             widgetModel.create(widget, function (err, widget) {
//                 if(err){
//                     defer.reject(err);
//                     console.log("Inside if -> error");
//                     console.log(err);
//                 }
//                 else {
//                     pageModel.findPageById(widget._page)
//                         .then(function (page) {
//                             page.widgets.push(widget._id);
//                             page.save(function (err) {
//                                 if(err)
//                                     defer.reject(err);
//                                 else
//                                     defer.resolve(widget);
//                             });
//                         });
//                 }
//             });
//         });
//     return defer.promise;
// }
//
// function findWidgetsByPageId(pageId) {
//     var defer = q.defer();
//     widgetModel.find({_page: pageId})
//         .sort('position')
//         .exec(function (err, widgets) {
//             if (err)
//                 defer.reject(err);
//             else
//                 defer.resolve(widgets);
//         });
//     return defer.promise;
// }
//
// function findWidgetById(widgetId) {
//     var defer = q.defer();
//     widgetModel.findById(widgetId, function (err, widget) {
//         if(err)
//             defer.reject(err);
//         else
//             defer.resolve(widget);
//     });
//     return defer.promise;
// }
//
// function updateWidget(widgetId, widget) {
//     var defer = q.defer();
//     widgetModel.findByIdAndUpdate(widgetId, widget, function (err, widget) {
//         if(err)
//             defer.reject(err);
//         else
//             defer.resolve(widget);
//     });
//     return defer.promise;
// }
//
// function deleteWidget(widgetId) {
//     var defer = q.defer();
//     widgetModel.findById(widgetId, function (err, widget) {
//         if(err)
//             defer.reject(err);
//         else {
//             widgetModel.update({_page: widget._page, position: {$gt: widget.position}}, {$inc: {position: -1}}, {multi: true}, function (err, success) {
//                 if(err)
//                     defer.reject(err);
//                 else {
//                     widgetModel.findByIdAndRemove(widgetId, function (err, widget) {
//                         if(err)
//                             defer.reject(err);
//                         else {
//                             widget.remove();
//                             defer.resolve(widget);
//                         }
//                     });
//                 }
//             });
//         }
//     });
//     return defer.promise;
// }
//
// function reorderWidget(pageId, start, end) {
//     var defer = q.defer();
//     if(start < end) {
//         widgetModel.update({_page: pageId, position: {$gt: start, $lte: end}}, {$inc: {position: -1}}, {multi: true}, function (err, success) {
//             if(err)
//                 defer.reject(err);
//             else {
//                 widgetModel.findOneAndUpdate({_page: pageId, position: start}, {$set: {position: end}}, function (err, widget) {
//                     if(err)
//                         defer.reject(err);
//                     else
//                         defer.resolve(widget);
//                 });
//             }
//         });
//     } else {
//         widgetModel.update({_page: pageId, position: {$gte: end, $lt: start}}, {$inc: {position: 1}}, {multi: true}, function (err, success) {
//             if(err)
//                 defer.reject(err);
//             else {
//                 widgetModel.findOneAndUpdate({_page: pageId, position: start}, {$set: {position: end}}, function (err, widget) {
//                     if(err)
//                         defer.reject(err);
//                     else
//                         defer.resolve(widget);
//                 });
//             }
//         });
//     }
//     return defer.promise;
// }

