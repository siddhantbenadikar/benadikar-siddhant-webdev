(function() {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", widgetListController);

    function widgetListController(WidgetService, $sce, $routeParams) {
        var model = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;

        model.userId = userId;
        model.websiteId = websiteId;
        model.pageId = pageId;

        model.doYouTrustUrl = doYouTrustUrl;
        model.doYouTrustHtml = doYouTrustHtml;
        
        function init() {
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            if(widgets) {
                model.widgets = widgets;
            } else {
                model.message = "No widgets to display"
            }
        }init();

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }

        function doYouTrustHtml(htmlContent) {
            return $sce.trustAsHtml(htmlContent);
        }
    }
})();