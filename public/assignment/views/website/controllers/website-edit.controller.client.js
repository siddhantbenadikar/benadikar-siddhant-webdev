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
            WebsiteService.findWebsitesByUser(userId)
                .then(function(response) {
                    var websites = response.data;
                    if(websites.length === 0)
                        model.message = "No websites to display"
                    else
                        model.websites = websites;
                });

            WebsiteService.findWebsiteById(websiteId)
                .then(function (response) {
                    model.presentWebsite = response.data;
                });
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