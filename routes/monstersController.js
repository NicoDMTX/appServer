const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

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

    deleteItem(item, url) {
        router.delete(url, (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send('ID unknown : ' + req.params)
        }
        
        return item.findByIdAndRemove(
            req.params.id,
            (err, docs) => {
                if (!err) {
                    res.send(docs);
                }
                return console.log("Delete error");
            })
        })
    }
}

const monsterController = new MonstersController
monsterController.getItem(MonstersModel, '/')
monsterController.deleteItem(MonstersModel, '/:id')

module.exports = router;