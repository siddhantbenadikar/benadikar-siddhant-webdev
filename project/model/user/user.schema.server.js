var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    facebook: {id: String, token: String},
    google: {id: String, token: String},
    email: String,
    imgUrl: String,
    phone: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'PalateRestaurant'}],
    restaurantLikes: [String],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'PalateUser'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'PalateUser'}],
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    dateCreated: {type: Date, default: Date.now()},
}, {collection: 'palate_user'});

module.exports = userSchema;
