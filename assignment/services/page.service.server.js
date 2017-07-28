module.exports = function (app) {

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        page._id = (new Date()).getTime() + "";
        page.websiteId = websiteId;
        pages.push(page);
        res.json(page);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if (pages[p]._id === pageId)
                res.json(pages[p]);
        }
    }

    function findPageByWebsiteId(req, res) {
        var pageList = [];
        var websiteId = req.params.websiteId;
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                pageList.push(pages[p]);
            }
        }
        if(pageList.length > 0) {
            res.json(pageList);
        } else {
            res.send("0");
        }
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages){
            if(pages[p]._id === pageId){
                pages[p] = page;
                res.json(pages[p]);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pid = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pid) {
                pages.splice(p, 1);
                return;
            }
        }

    }
    
};