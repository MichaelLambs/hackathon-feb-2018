var router = require("express").Router();
var Users = require("../models/user");

var errorMessage = { error: "Cereal not Authorized" };

// THIS THE ROUTER REQUEST ROUTE. THIS IS THE PATH IT TAKES TO GET TO SERVER. LOGIN BUTTON TIED HERE
router.post("/granolagram/auth/register", (req, res) => {
    req.body.password = Users.generateHash(req.body.password) // RUNS PASSWORD THROUGH BCRYPTJS ENCRYPTION
    Users.create(req.body) // CREATES USER ON SERVER WITH ENCRYPTED PASSWORD
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

// THIS FINDS USER BY SUBMITTED EMAIL THEN VALIDATES THAT PASSWORD IS CORRECT
router.post("/granolagram/auth/login", (req, res) => {
    Users.findOne({ email: req.body.email }).then(user => {
        if (!user) { // IF USER BY EMAIL DOES NOT EXIST
            return res.status(401).send(errorMessage)
        }
        if (!user.validatePassword(req.body.password)) { // IF THE PASSWORD DOES NOT MATCH AFTER UNENCRYPTED BY BCYRPTJS
            return res.status(401).send(errorMessage)
        }
        user.password = null // RETURNS A NULL PASSWORD TO PREVENT HACKING
        req.session.uid = user._id

        res.send({ message: "Success", user }) // SENDS USER DATA BACK TO FRONT END
    })
})
//this checks to make sure youre logged in. if not it will send you to the login page
router.get('/granolagram/auth/authenticate', (req, res) => {
    Users.findById(req.session.uid)
        .then(user => {
            if (!user) {
                return res.status(401).send({ error: "Please Login to Continue" })
            }
            user.password = null;
            return res.status(200).send(user)
        }).catch(err => {
            return res.status(500).send({
                error: err
            })
        })
})
router.delete('/granolagram/auth/logout', (req, res) => {
    req.session.destroy()
    res.send("Successfully logged out")
})

module.exports = router;
