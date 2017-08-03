(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", flickrImageSearchController);

    function flickrImageSearchController($routeParams, $location, WidgetService, FlickrService) {
        var model = this;

        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            model.userId = $routeParams['uid'];
            model.websiteId = $routeParams['wid'];
            model.pageId = $routeParams['pid'];
            model.presentWidgetId = $routeParams['wgid'];

            WidgetService.findWidgetById(model.presentWidgetId)
                .then(function(response) {
                    console.log("Success");
                    model.presentWidget = response.data;
                });
        } init();
        
        
        function searchPhotos(searchTerm) {
            FlickrService.searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                }, function (err) {
                    model.error = err;
                });
        }
        
        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            model.presentWidget.url = url;
            WidgetService
                .updateWidget(model.presentWidgetId, model.presentWidget)
                .then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.presentWidgetId);
                }, function (err) {
                    model.error = "Failed to update widget";
                });
        }
    }
})();