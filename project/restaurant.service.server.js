var q = require('q');
const https = require('https');
const querystring = require('querystring');


module.exports = function (app) {

    app.get("/api/location/:location", findLocation);
    app.get("/api/restaurant", searchRestaurantsByLocation);
    app.get("/api/restaurant/:rid", searchRestaurantById);
    


    function findLocation(req, res) {
        var location = req.params.location;
        zomatoFindLocation(location)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function zomatoFindLocation(location) {
        location = location.replace(new RegExp(" ", 'g'), "%20");
        location = location.replace(new RegExp(",", 'g'), "%2C");
        var defer = q.defer();
        https.get({
            host: 'developers.zomato.com',
            path: '/api/v2.1/locations?query=' + location,
            headers: {
                "Accept": "application/json",
                "user-key": "aab0bf5a65624e10925ce1720007a332"
            }
        }, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                try {
                    body = JSON.parse(body);
                    defer.resolve(body);
                } catch (e) {
                    defer.reject({error: e});
                }
            });
        });
        return defer.promise;
    }

    function searchRestaurantsByLocation(req, res) {
        var entityId = req.query.entityId;
        var entityType = req.query.entityType;
        zomatoSearchRestaurantsByLocation(entityId, entityType)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function zomatoSearchRestaurantsByLocation(entityId, entityType) {
        var defer = q.defer();
        https.get({
            host: 'developers.zomato.com',
            path: '/api/v2.1/search?entity_id=' + entityId + '&entity_type=' + entityType +"&sort=rating",
            headers: {
                "Accept": "application/json",
                "user-key": "aab0bf5a65624e10925ce1720007a332"
            }
        }, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                try {
                    body = JSON.parse(body);
                    defer.resolve(body);
                } catch (e) {
                    defer.reject({error: e});
                }
            });
        });
        return defer.promise;
    }

    function searchRestaurantById(req, res) {
        var rid = req.params.rid;
        zomatoSearchRestaurantById(rid)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function zomatoSearchRestaurantById(rid) {
        var defer = q.defer();
        https.get({
            host: 'developers.zomato.com',
            path: '/api/v2.1/restaurant?res_id=' + rid,
            headers: {
                "Accept": "application/json",
                "user-key": "aab0bf5a65624e10925ce1720007a332"
            }
        }, function (response) {
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
                try {
                    body = JSON.parse(body);
                    defer.resolve(body);
                } catch (e) {
                    defer.reject({error: e});
                }
            });
        });
        return defer.promise;
    }
    
};