var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Tidbit'

var schema = new Schema({
    user: {type: String, required: true},
    portrait: {type: String, default: 'http://flathash.com/'},
    content: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now()},
    gramId: {type: ObjectId, ref: 'Gram', required: true}
})

module.exports = mongoose.model(schemaName, schema)
