(function () {

    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController);

    function pageListController($routeParams, PageService) {
        var model = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        model.userId = userId;
        model.websiteId = websiteId;


        function init() {
            var pages = PageService.findPageByWebsiteId(websiteId);
            if(pages) {
                model.pages = pages;
            } else {
                model.message = "No pages to display"
            }
        }init();
    }

})();