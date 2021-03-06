(function () {

    angular
        .module("WebAppMaker")
        .controller("PageEditController", pageEditController);

    function pageEditController($routeParams, $location, PageService) {
        var model = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        model.userId = userId;
        model.websiteId = websiteId;
        model.pageId = pageId;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            PageService.findPageByWebsiteId(websiteId)
                .then(function(response) {
                    var pages = response.data;
                    if(pages.length === 0)
                        model.message = "No pages to display"
                    else
                        model.pages = pages;
                });

            PageService.findPageById(pageId)
                .then(function (response) {
                    model.presentPage = response.data;
                });
        }init();
        
        function updatePage() {
            PageService.updatePage(pageId, model.presentPage);
            model.message = "Updated successfully";
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");
        }

        function deletePage() {
            PageService.deletePage(pageId);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page");
        }
    }
})();