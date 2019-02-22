var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new Schema({
    user: String,
    score: Number,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('record', recordSchema);
