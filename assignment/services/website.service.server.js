module.exports = function(app) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.post("/api/user/:userId/website", createWebsite);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userId = req.params.userId;
        newWebsite._id = (new Date()).getTime() + "";
        newWebsite.developerId = userId;
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;
        var sites = [];

        for(var w in websites) {
            if(websites[w].developerId === userId) {
                sites.push(websites[w]);
            }
        }
        if(sites.length > 0) {
            res.json(sites);
        } else {
            res.send("0");
        }
    }

    function findWebsiteById(req, res){
        var wid = req.params.websiteId;
        for(var w in websites) {
            if (websites[w]._id === wid)
                res.json(websites[w]);
        }
    }

    function updateWebsite(req, res){
        var wid = req.params.websiteId;
        var website = req.body;
        for(var w in websites){
            if(websites[w]._id === wid){
                websites[w] = website;
                res.json(websites[w]);
                return;
            }
        }
    }

    function deleteWebsite(req, res){
        var wid = req.params.websiteId;
        for(var w in websites) {
            if( websites[w]._id === wid ) {
                websites.splice(w, 1);
                return;
            }
        }
    }

};