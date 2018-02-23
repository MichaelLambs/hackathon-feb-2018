var router = require('express').Router()
var Tidbits = require('../models/tidbit')



// GET ALL TIDBITS BY USER NAME
router.get('/granolagram/tidbits/:user', (req, res, next) => {
    Tidbits.find({"user":req.params.user})
        .then(tidbit => {
            if (!tidbit) {
                res.status(400).send({ error: "Invalid Username" })
            }
            return res.send(tidbit)
        })
        .catch(next)
})

// CREATE A TIDBIT
router.post('/granolagram/tidbits', (req, res, next) => {
    Tidbits.create(req.body)
        .then(tidbit => {
            return res.send(tidbit)
        })
        .catch(next)
})

// EDIT A TIDBIT BY ID
router.put('/granolagram/tidbits/:id', (req, res, next) => {
    Tidbits.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(tidbit => {
            return res.send(tidbit)
        })
        .catch(next)
})

// DELETE TIDBIT
router.delete('/granolagram/tidbits/:id', (req, res, next) => {
    Tidbits.findByIdAndRemove(req.params.id)
        .then(tidbit => {
            return res.send("Tidbit Deleted!!")
        })
        .catch(next)
})




module.exports = router