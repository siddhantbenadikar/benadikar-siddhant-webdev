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
            PageService.findPageByWebsiteId(websiteId)
                .then(function(response) {
                    var pages = response.data;
                    if(pages === "0")
                        model.message = "No pages to display"
                    else
                        model.pages = pages;
                });
        }init();

        function addPage(page) {
            if(!page) {
                model.errorMessage = "Please enter details";
                return;
            }
            PageService.createPage(websiteId, page)
                .then(function () {
                    $location.url("/user/" + userId + "/website/" + websiteId + "/page")
                });
        }
    }
})();