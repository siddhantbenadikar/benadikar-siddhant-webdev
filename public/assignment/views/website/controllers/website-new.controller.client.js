(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController($routeParams, WebsiteService, $location) {
        var model = this;
        var userId = $routeParams.uid;

        model.userId = userId;

        model.addWebsite = addWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(userId)
                .then(function(response) {
                    var websites = response.data;
                    if(websites.length === 0)
                        model.message = "No websites to display"
                    else
                        model.websites = websites;
                });
        }init();
        
        function addWebsite(website) {
            if(!website) {
                model.errorMessage = "Please enter details";
                return;
            }
            WebsiteService.createWebsite(userId, website)
                .then(function () {
                    $location.url("/user/"+userId+"/website/");
                });
        }
    }
})();