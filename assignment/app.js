module.exports = function(app) {
    var db = require("./model/models.server");
    var userModel = require('./model/user/user.model.server');
    var websiteModel = require('./model/website/website.model.server');
    var pageModel = require('./model/page/page.model.server');
    var widgetModel = require('./model/widget/widget.model.server');

    require("./services/user.service.server.js")(app, userModel);
    require("./services/website.service.server.js")(app, websiteModel);
    require("./services/page.service.server.js")(app, pageModel);
    require("./services/widget.service.server.js")(app, widgetModel);
};
