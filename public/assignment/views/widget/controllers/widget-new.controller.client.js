(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, WidgetService) {
        var model = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;

        model.userId = userId;
        model.websiteId = websiteId;
        model.pageId = pageId;
        model.widgetId = widgetId;

        model.createWidget = createWidget;

        function init() {
        }init();

        function createWidget(type) {
            var newWidget = {};
            newWidget.type = type;
            WidgetService.createWidget(pageId, newWidget)
                .then(function (response) {
                    var wgid = response.data._id;
                    $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+wgid);
                });
        }

    }
})();