var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Page'}],
    dateCreated: {type: Date, default: Date.now()}
}, {collection: 'website'});

websiteSchema.post('remove', function () {
    var website = this;
    var userModel = require('../user/user.model.server');
    var pageModel = require('../page/page.model.server');
    var widgetModel = require('../widget/widget.model.server');
    userModel.findUserById(website._user)
        .then(function (user) {
            var index = user.websites.indexOf(website._id);
            if(index > -1) {
                user.websites.splice(index, 1);
                user.save();
            }
        });
    widgetModel.remove({_page: {$in: website.pages}}).exec();
    pageModel.remove({_id: {$in: website.pages}}).exec();
});

module.exports = websiteSchema;