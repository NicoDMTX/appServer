const express = require('express')
const router = express.Router();
// const ObjectId = require('mongoose').Types.ObjectId;

const { MonstersModel } = require('../models/MonstersModel')

router.get('/', (req, res) => {
    MonstersModel.find((err, docs) => {
        if (!err) {
            return res.send(docs)
        }
        return console.log('Error to get data ' + err)
    })
}) 

module.exports = router;