(function () {
    
    angular
        .module("WebAppMaker")
        .controller("PageNewController", pageNewController);
    
    function pageNewController($routeParams, PageService, $location) {
        var model = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        model.userId = userId;
        model.websiteId = websiteId;

        model.addPage = addPage;

        function init() {
            var pages = PageService.findPageByWebsiteId(websiteId);
            if(pages) {
                model.pages = pages;
            } else {
                model.message = "No pages to display"
            }
        }init();

        function addPage(page) {
            if(!page) {
                model.errorMessage = "Please enter details";
                return;
            }
            var page = PageService.createPage(websiteId, page);
            if(page) {
                $location.url("/user/" + userId + "/website/" + websiteId + "/page")
            } else {
                model.errorMessage = "Page not found";
            }
        }
    }
})();