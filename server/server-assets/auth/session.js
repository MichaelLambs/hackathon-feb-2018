var expressSession = require("express-session") // USES EXPRESS FRAMEWORK TO CREATE SESSION COOKIES
var mongoStore = require("connect-mongodb-session")(expressSession)

// THIS IS WHERE SESSIONS ARE BEING HELD WITHIN SERVER
var store = new mongoStore({
    uri: "mongodb://granola:granola@ds034807.mlab.com:34807/hackathon-feb-2018",
    collection: "Sessions"
});

// IF THERE IS AN ERROR GETTING THE SESSION
store.on("error", function(err) {
    console.log("[SESSION ERROR]", err);
})

// SESSION CONSTRUCTOR/GUIDELINE
var session = expressSession({
    secret: "all of your granola is belong to m3",
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 7) * 52 // HOW LONG UNTIL NEED TO RE-LOGIN
    },
    store, // PUTTING ON MONGO SERVER VIA URI
    resave: true,
    saveUninitialized: true

})

module.exports = session;
