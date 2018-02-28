var express = require('express')
var bp = require('body-parser')
var cors = require('cors')
var server = express()
var session = require('./server-assets/auth/session')

var port = 3000
require('./server-assets/db/mlab-config')

let authRoutes = require('./server-assets/auth/routes')
let gramRoutes = require('./server-assets/routes/grams')
let tidbitRoutes = require('./server-assets/routes/tidbits')

var whitelist = ['http://localhost:8080']
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhiteListed = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhiteListed);
    },
    credentials: true
}

server.use(cors(corsOptions))
server.use(session)
server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

server.use(authRoutes);

// THIS ALLOWS TO LOOK BUT NOT TOUCH
server.use("/home/*", (req, res, next) => {
    if (req.method.toLowerCase() != "get" && !req.session.uid) {
      return res.status(401).send({ error: "PLEASE LOGIN TO CONTINUE" });
    }
  
    next();
  });



server.use(gramRoutes);
server.use(tidbitRoutes);



// CATCH ALL ERROR
server.use('*', (error, req, res, next) => {
    res.status(400).send(error)
})

server.listen(port, () => {
    console.log('Server Running On: ', port)
})