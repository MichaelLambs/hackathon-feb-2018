var express = require('express')
var bp = require('body-parser')
var cors = require('cors')
var server = express()

var port = 3000
require('./server-assets/db/mlab-config')

let gramRoutes = require('./server-assets/routes/grams')
let tidbitRoutes = require('./server-assets/routes/tidbits')

server.use(cors())
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

server.use(gramRoutes);
server.use(tidbitRoutes);



// CATCH ALL ERROR
server.use('*', (error, req, res, next) => {
    res.status(400).send(error)
})

server.listen(port, () => {
    console.log('Server Running On: ', port)
})