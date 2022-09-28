const express = require('express')
const router = express.Router();

const { CharactersModel } = require('../models/charactersModel')

router.get('/', (req, res) => {
    CharactersModel.find((err, docs) => {
        if (!err) {
            return res.send(docs)
        }
        return console.log('Error to get data ' + err)
    })
})

/**
 * post 
 */

router.post('/', (req, res) => {
    const newCharacter = new CharactersModel({
        name: req.body.name,
        level: req.body.level,
        life: req.body.life,
        job: req.body.job
    })

    newCharacter.save((err, docs) => {
        if (!err) {
            return res.send(docs);
        }

        return console.log('Error creating data :' + err)
    })
})

module.exports = router;