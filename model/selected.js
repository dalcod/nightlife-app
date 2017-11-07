var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SelectionSchema = new Schema({
    localId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

var selSchema =  new Schema({
    username: {type: String, required: true, unique: true},
    selections: [SelectionSchema]
});

module.exports = mongoose.model("selectedLocals", selSchema);