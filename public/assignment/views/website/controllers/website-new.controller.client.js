(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", websiteNewController);

    function websiteNewController($routeParams, WebsiteService, $location) {
        var model = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        model.userId = userId;
        model.websiteId = websiteId;

        model.addWebsite = addWebsite;

        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);
            if(websites) {
                model.websites = websites;
            } else {
                model.message = "No websites to display"
            }
        }init();
        
        function addWebsite(website) {
            if(!website) {
                model.errorMessage = "Please enter details";
                return;
            }
            var website = WebsiteService.createWebsite(userId, website);
            if(website) {
                $location.url("/user/"+userId+"/website/");
            } else {
                model.errorMessage = "Website not found";
            }
        }
    }
})();