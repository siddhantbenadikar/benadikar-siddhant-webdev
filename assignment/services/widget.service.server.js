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
    app.put("/page/:pageId/widget", sortable);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widget = getWidgetById(widgetId);
        widget.url = '/uploads/'+filename;

        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

        res.redirect(callbackUrl);
    }
    
    function sortable(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        var widgetList = [];
        widgets = widgets.filter(function (x){
            if(pageId === x.pageId)
                widgetList.push(x);
            return pageId !== x.pageId
        });
        var widget = widgetList[initial];
        widgetList.splice(initial, 1);
        widgetList.splice(final, 0, widget);
        widgets.push.apply(widgets, widgetList);
        res.json(widgets);
    }

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
            if(widgets[w]._id === widgetId) {
                res.json(widgets[w]);
                return;
            }
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

    function getWidgetById(widgetId) {
        for(var w in widgets) {
            if(widgets[w]._id === widgetId)
                return widgets[w];
        }
    }
};