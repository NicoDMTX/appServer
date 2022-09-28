const express = require('express')
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

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

router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params)
    }
    
    const updatedCharacter = {
        name: req.body.name,
    }

    CharactersModel.findOneAndUpdate(
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

router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params)
    }

    return CharactersModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) {
                res.send(docs);
            }
            return console.log("Delete error");
        })
    })
    

module.exports = router;