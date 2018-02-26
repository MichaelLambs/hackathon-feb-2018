var router = require('express').Router()
var Grams = require('../models/gram')
var Tidbits = require('../models/tidbit')


// HOME PAGE
router.get('/granolagram/home', (req, res, next) => {
    Grams.find({})
        .then(grams => {
            res.send(grams)
        })
        .catch(next)
})

// GET ALL GRAMS BY USER NAME
router.get('/granolagram/grams/:user', (req, res, next) => {
    Grams.find({"user":req.params.user})
        .then(gram => {
            if (!gram) {
                res.status(400).send({ error: "Invalid Username" })
            }
            return res.send(gram)
        })
        .catch(next)
})

// GET ALL TIDBITS FROM A GRAM ID
router.get('/granolagram/grams/:gramId/tidbits', (req, res, next) => {
    Tidbits.find({"gramId": req.params.gramId})
    .then(tidbits => {
        res.send(tidbits)
    })
    .catch(next)
})

// CREATE A GRAM
router.post('/granolagram/home', (req, res, next) => {
    req.body.userId = req.session.uid // GIVES GRAM YOUR USER ID
    Grams.create(req.body)
        .then(gram => {
            res.send(gram)
        })
        .catch(next)
})

// EDIT A GRAM BY ID
router.put('/granolagram/grams/:id', (req, res, next) => {
    Grams.findByIdAndUpdate(req.params.id, req.body)
    .then(gram => {
        debugger
            return res.send(gram)
        })
        .catch(next)
})

// DELETE GRAM
router.delete('/granolagram/grams/:id', (req, res, next) => {
    Grams.findByIdAndRemove(req.params.id)
        .then(gram => {
            return res.send("Gram Deleted!!")
        })
        .catch(next)
})

module.exports = router