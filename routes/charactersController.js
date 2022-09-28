const express = require('express')
const router = express.Router();

const { CharactersModel } = require('../models/charactersModel')

router.get('/', (req, res) => {
    CharactersModel.find((err, docs) => {
        console.log(docs)
    })
})

module.exports = router;