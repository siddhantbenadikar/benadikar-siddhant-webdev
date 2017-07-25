(function () {

    angular
        .module("WebAppMaker")
        .factory("PageService", pageService);

    function pageService() {

        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }
        return api;

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }
        
        function findPageById(pageId) {
            for(var p in pages) {
                if (pages[p]._id === pageId)
                    return angular.copy(pages[p]);
            }
            return null;
        }
        
        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p] = page;
                    return;
                }
            }
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var webpages = [];

            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    webpages.push(angular.copy(pages[p]));
                }
            }
            if(webpages.length > 0)
                return webpages;
            else
                return null;
        }
        
        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId)
                    pages.splice(p, 1);
            }
        }

    }

})();