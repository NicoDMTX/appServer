const express = require('express');
const { UserModel } = require('../models/userModels');
const router = express.Router();
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
        router.post(url, async (req, res) => {
            const { firstName, email, password } = req.body

            try {
                const newUser = await new item({ firstName, email, password})
                
                await newUser.save((err, docs) => {
                    if(!err) {
                        res.json(newUser)
                        return res.send(docs)
                    } 
                    return console.log(err)
                })
            } catch(e) {
                return console.log(e)
            }

        })
    }
}

const userBuilder = new User;
userBuilder.RegisterUser(UserModel, '/');
userBuilder.getItem(UserModel, '/');

module.exports = router;
