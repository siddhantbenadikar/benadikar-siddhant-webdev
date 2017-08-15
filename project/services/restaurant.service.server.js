var q = require('q');
const https = require('https');
const querystring = require('querystring');

var restaurantModel = require("../model/restaurant/restaurant.model.server");
module.exports = function (app) {

    app.get("/pal/location/:location", findLocation);
    app.get("/pal/restaurant/search", searchRestaurantsByLocation);
    app.get("/pal/restaurant/:rid", searchRestaurantById);
    app.get("/pal/restaurant", addRestaurant);
    app.get("/pal/restaurant/name/:name", searchByRestaurantName);

    function addRestaurant(req, res) {
        var restaurant = req.body;
        restaurantModel
            .addRestaurant(restaurant)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (err) {
                res.sendStatus(200);
            });
    }

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

    function searchByRestaurantName(req, res) {
        var name = req.params.name;
        zomatoSearchByRestaurantName(name)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function zomatoSearchByRestaurantName(name) {
        name = name.replace(new RegExp(" ", 'g'), "%20");
        name = name.replace(new RegExp(",", 'g'), "%2C");
        var defer = q.defer();
        https.get({
            host: 'developers.zomato.com',
            path: '/api/v2.1/search?q=' + name + "&sort=real_distance",
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