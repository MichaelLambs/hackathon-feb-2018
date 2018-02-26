var router = require("express").Router();
var Users = require("../models/user");

var errorMessage = { error: "Cereal not Authorized" };

// THIS THE ROUTER REQUEST ROUTE. THIS IS THE PATH IT TAKES TO GET TO SERVER. LOGIN BUTTON TIED HERE
router.post("/granolagram/auth/register", (req, res) => {
    req.body.password = Users.generateHash(req.body.password) // RUNS PASSWORD THROUGH BCRYPT ENCRYPTION
    Users.create(req.body)
        .then(user => {
            if (!user) {
                return res.status(401).send(errorMessage)
            }
            user.password = null; // RETURNS NULL TO FRONT END NO HACKING
            req.session.uid = user._id // MATCHES SESSION ID WITH MONGO ID (HOLDING HANDS)
            console.log("Succesfully Registered")
            res.send(user)
        })
        .catch(err => res.status(401).send(errorMessage))
})

// THIS AUTHENTICATES
router.post("/granolagram/auth/login", (req, res) => {
    Users.findOne({ email: req.body.email }).then(user => { 
        if (!user) { // IF USER BY EMAIL DOES NOT EXIST
            return res.status(401).send(errorMessage)
        }
        if (!user.validatePassword(req.body.password)) { // IF THE PASSWORD DOES NOT MATCH AFTER UNENCRYPTED BY BCYRPTJS
            return res.status(401).send(errorMessage)
        }
        user.password = null
        req.session.uid = user._id
        
        res.send({message: "Success", user})
    })
})

module.exports = router;
