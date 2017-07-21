(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var model = this;
        var userId = $routeParams.uid;

        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);
            if(websites) {
                model.websites = websites;
            } else {
                model.message = "No websites to display"
            }
        }init();

        model.userId = userId;
    }
})();