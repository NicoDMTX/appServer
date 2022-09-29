const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { CharactersModel } = require('../models/charactersModel')

class CharacterController {
    constructor(item, url) {
        this.item = item,
        this.url = url
    }

    getItem(item, url) {
        router.get(url, (req, res) => {
            item.find((err, docs) => {
                if (!err) {
                    return res.send(docs)
                }
                return console.log('Error to get data ' + err)
            })
        })
    }
    
    createItem(item, url) {
        router.post(url, (req, res) => {
            const newCharacter = new item({
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
    }

    updateItem(item, url) {
        router.put(url, (req, res) => {
            if (!ObjectId.isValid(req.params.id)) {
                return res.status(400).send('ID unknown : ' + req.params)
            }
            
            const updatedCharacter = {
                name: req.body.name,
            }
        
            item.findOneAndUpdate(
                req.params.id,
                { $set: updatedCharacter },
                { new: true },
                (err, docs) => {
                    if (!err) {
                        return res.send(docs)
                    }
                    
                    return console.log('Update error: ' + docs)
                }
            )
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

const characterController = new CharacterController
characterController.getItem(CharactersModel, '/')
characterController.createItem(CharactersModel, '/')
characterController.updateItem(CharactersModel, '/:id')
characterController.deleteItem(CharactersModel, '/:id')

module.exports = router;