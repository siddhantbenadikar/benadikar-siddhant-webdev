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
            WidgetService.findWidgetsByPageId(pageId)
                .then(function(response) {
                    var widgets = response.data;
                    if(widgets === "0")
                        model.message = "No widgets to display"
                    else
                        model.widgets = widgets;
                });

            WidgetService.findWidgetById(widgetId)
                .then(function (response) {
                    model.presentWidget = response.data;
                });
        }init();

        function deleteWidget() {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");

        }

        function updateWidget() {
            WidgetService.updateWidget(widgetId, model.presentWidget);
            model.message = "Updated successfully";
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
        }
    }
})();