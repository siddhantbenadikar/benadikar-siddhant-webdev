module.exports = function(app, websiteModel) {

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.userId;
        websiteModel.createWebsite(userId, newWebsite)
            .then(function(website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        websiteModel.findWebsitesByUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWebsiteById(req, res){
        var wid = req.params.websiteId;
        websiteModel.findWebsiteById(wid)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWebsite(req, res){
        var wid = req.params.websiteId;
        var website = req.body;
        websiteModel.updateWebsite(wid, website)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWebsite(req, res){
        var wid = req.params.websiteId;
        websiteModel.deleteWebsite(wid)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

};