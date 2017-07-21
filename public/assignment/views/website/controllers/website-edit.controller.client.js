(function() {

    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", websiteEditController);

    function websiteEditController($routeParams, WebsiteService, $location) {
        var model = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        model.userId = userId;
        model.websiteId = websiteId;


        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);
            if(websites) {
                model.websites = websites;
            } else {
                model.message = "No websites to display"
            }

            var presentWebsite = WebsiteService.findWebsiteById(websiteId);
            if(presentWebsite) {
                model.presentWebsite = presentWebsite;
            } else {
                model.errorMessage = "Website not found"
            }
        }init();


        function updateWebsite() {
            WebsiteService.updateWebsite(websiteId, model.presentWebsite);
            model.message = "Updated successfully";
            $location.url("/user/"+userId+"/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
            $location.url("/user/"+userId+"/website");
        }
    }
})();