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
            PageService.findPageByWebsiteId(websiteId)
                .then(function(response) {
                    var pages = response.data;
                    if(pages === "0")
                        model.message = "No pages to display"
                    else
                        model.pages = pages;
                });
        }init();
    }

})();