module.exports = function(app) {
    var db = require("../assignment/model/models.server");
    require("./services/restaurant.service.server")(app);
    require('./services/user.service.server')(app);
    require('./services/review.service.server')(app);
};
