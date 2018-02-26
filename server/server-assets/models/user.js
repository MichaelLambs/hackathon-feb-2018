var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require("bcryptjs")
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'User'
const SALT_FACTOR = 13;

var schema = new Schema({
    createdUser: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, minlength: 6},
    portrait: {type: String, default: 'http://flathash.com/'},
    created: {type: Date, required: true, default: Date.now()}
})

// GENERATES THE HASH FROM THE PASSWORD WE PASS IT AND ENCRYPTS IT SALT X 13
schema.statics.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
}

// ENCRYPTS INPUTED PASSWORD AND CHECKS AGAINST SAVED ENCRYPTED PASSWORD
schema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password) 
}

module.exports = mongoose.model(schemaName, schema)
