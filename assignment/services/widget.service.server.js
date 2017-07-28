module.exports = function (app) {
    
    var widgets = [
        {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    // app.put("/page/:pageId/widget", sortable);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        widget._id = (new Date()).getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        res.json(widget);
    }

    function findWidgetsByPageId(req, res){
        var widgetList = [];
        var pageId = req.params.pageId;
        for (var w in widgets){
            if(widgets[w].pageId === pageId){
                widgetList.push(widgets[w]);
            }
        }
        if(widgetList.length > 0) {
            res.json(widgetList);
        } else {
            res.send("0");
        }
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id === widgetId)
                res.json(widgets[w]);
        }
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                widgets[w] = widget;
                res.json(widgets[w]);
                return;
            }
        }
    }

    function deleteWidget(req, res){
        var wgid = req.params.widgetId;
        for (var w in widgets){
            if(widgets[w]._id === wgid) {
                widgets.splice(w, 1);
                return;
            }
        }
    }
};