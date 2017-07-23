(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, WidgetService) {
        var model = this;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        var widgetId = $routeParams.wgid;

        model.userId = userId;
        model.websiteId = websiteId;
        model.pageId = pageId;
        model.widgetId = widgetId;

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            if(widgets) {
                model.widgets = widgets;
            } else {
                model.message = "No pages to display"
            }

            var presentWidget = WidgetService.findWidgetById(widgetId);
            if(presentWidget) {
                model.presentWidget = presentWidget;
            } else {
                model.errorMessage = "Page not found"
            }
        }init();

        function deleteWidget() {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");

        }

        function updateWidget() {
            WidgetService.updateWidget(widgetId,model.presentWidget);
            model.message = "Updated successfully";
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }
    }
})();