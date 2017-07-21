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
            var pages = PageService.findPageByWebsiteId(websiteId);
            if(pages) {
                model.pages = pages;
            } else {
                model.message = "No pages to display"
            }

            var presentPage = PageService.findPageById(pageId);
            if(presentPage) {
                model.presentPage = presentPage;
            } else {
                model.errorMessage = "Page not found"
            }
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