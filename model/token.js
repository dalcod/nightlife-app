var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('YelpAuthToken',
                               new Schema({access_token: {type: String}}),
                               'yelpauthtoken');