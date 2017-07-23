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
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            if(widgets) {
                model.widgets = widgets;
            } else {
                model.message = "No widgets to display"
            }
        }init();

        function createWidget(type) {
            var newWidget = {};
            newWidget.widgetType = type;
            var wgid = WidgetService.createWidget(pageId,newWidget);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+wgid);
        }


    }
})();