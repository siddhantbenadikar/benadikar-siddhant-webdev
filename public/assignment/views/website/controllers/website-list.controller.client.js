(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var model = this;
        var userId = $routeParams.uid;

        model.userId = userId;

        function init() {
            WebsiteService.findWebsitesByUser(userId)
                .then(function(response) {
                    var websites = response.data;
                    if(websites === "0")
                        model.message = "No websites to display"
                    else
                        model.websites = websites;
                });
            
        }init();
    }
})();