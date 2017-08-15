var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    title: String,
    description: String,
    timestamp: {type: Date, default: Date.now()},
    rid: String,
    _restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'PalateRestaurant'},
    _user: {type: mongoose.Schema.Types.ObjectId, ref: 'PalateUser'},
    rating: String
}, {collection: 'palate_review'});

module.exports = reviewSchema;