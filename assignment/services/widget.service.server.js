module.exports = function (app, widgetModel) {

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

        //widget = getWidgetById(widgetId);
        var nwidget = {};
        nwidget.url = '/uploads/'+filename;
        nwidget.size = size;
        nwidget.text = filename;
        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                console.log(widget);
                widget.url = nwidget.url;
                widget.save();
            });

        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

        res.redirect(callbackUrl);
    }
    
    function sortable(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
        widgetModel.reorderWidget(pageId, start, end)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        widgetModel.createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWidgetsByPageId(req, res){
        var pageId = req.params.pageId;
        widgetModel.findWidgetsByPageId(pageId)
            .then(function (page) {
                res.json(page.widgets)
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }



    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWidget(req, res){
        var widget = req.body;
        var widgetId = req.params.widgetId;
        widgetModel.updateWidget(widgetId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        widgetModel.deleteWidget(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    // function getWidgetById(widgetId) {
    //     widgetModel.findWidgetById(widgetId)
    //         .then(function (widget) {
    //             return widget;
    //         }, function (error) {
    //             return error;
    //         });
    // }
};