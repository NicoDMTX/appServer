const express = require('express');
const { UserModel } = require('../models/userModels');
const router = express.Router();
const { userValidation } = require('../validation/validation')
const bcrypt = require('bcrypt');

class User {
    constructor(item, url) {
        this.item = item
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

    RegisterUser(item, url) {
        router.post(url, (req, res) => {
            const newUser = new item({
                firstName: req.body.firstName,
                password: req.body.password,
            })

            // check joi conditions
            const {error} = userValidation(newUser);

            if (error) {
                return res.status(401).json(error.details[0]);
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    delete newUser.password
                    console.log(salt)
                    newUser.password = salt;
                })
            })

            newUser.save((err, docs) => {
                if (!err) {
                    return res.send(docs);
                }

                return console.log('Error creating data :' + err)
            })
        })
    }
}

const userBuilder = new User;
userBuilder.RegisterUser(UserModel, '/');

module.exports = router;
