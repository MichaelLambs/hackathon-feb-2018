var mongoose = require('mongoose');

var connectionString = "mongodb://granola:granola@ds034807.mlab.com:34807/hackathon-feb-2018";
var connection = mongoose.connection;

mongoose.connect(connectionString); connection.on("error", err => {
    console.log("mlab error: ", err);
}); connection.once("open", () => {
    console.log("Connected to mlab!");
});

