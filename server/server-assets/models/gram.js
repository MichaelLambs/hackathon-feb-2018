var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Gram'

var schema = new Schema({
    img: { type: String, required: true },
    user: { type: String, required: true },
    portrait: {type: String, default: 'http://flathash.com/'},
    caption: { type: String },
    date: { type: Date, required: true, default: Date.now() },
    like: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model(schemaName, schema)
