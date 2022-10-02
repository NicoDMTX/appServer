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
        router.post(url, async (req, res) => {

            try {
                const newUser = new item({
                    firstName: req.body.firstName,
                    password: req.body.password,
                })

                const userRules = userValidation(newUser);
                if (!userRules.password) { 
                    const salt = await bcrypt.genSalt(10)
                    
                    newUser.password = await bcrypt.hash(newUser.password, salt)
                } else {
                    return res.status(401)
                }

                if (userRules.firstName) {
                    await newUser.save((err, docs) => {
                        if (!err) {
                            return res.send(docs);
                        }
                        return console.log('Error creating data :' + err)
                    })
                } else {
                    return res.status(401).json(userRules.error.message);
                }
                
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
