var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    rid: {type: String, unique: true},
    title: String,
    location: String,
    imageUrl: String
}, {collection: 'palate_restaurant'});

module.exports = restaurantSchema;