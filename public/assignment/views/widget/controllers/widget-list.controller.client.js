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
        model.updatePosition = updatePosition;
        
        function init() {
            WidgetService.findWidgetsByPageId(pageId)
                .then(function(response) {
                    var widgets = response.data;
                    if(widgets.length === 0)
                        model.message = "No widgets to display"
                    else
                        model.widgets = widgets;
                });
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
        
        function updatePosition(initial, final) {
            WidgetService.updatePosition(initial, final, pageId)
                .then(function (widgets){});
        }
    }
})();