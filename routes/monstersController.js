const express = require('express')
const router = express.Router();
// const ObjectId = require('mongoose').Types.ObjectId;

const { MonstersModel } = require('../models/MonstersModel')

class MonstersController {
    constructor(item, url) {
        this.item = item,
        this.url = url
    }

    getItem = (item, url) =>  {
        router.get(url, (req, res) => {
            item.find((err, docs) => {
                if (!err) {
                    return res.send(docs)
                }
                return console.log('Error to get data ' + err)
            })
        }) 
    
    }
}

const monsterController = new MonstersController
monsterController.getItem(MonstersModel, '/')

module.exports = router;