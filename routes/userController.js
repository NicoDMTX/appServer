const express = require('express');
const { userModel } = require('../models/userModels');
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
            const { email, password } = req.body
            const salt = await bcrypt.genSalt(10)
            console.log(salt)

            try {
                     
                
                const newUser = await new item({ email, password: salt })

                await newUser.save((err, docs) => {
                    if(!err) {
                        console.log('Account created ! ')
                        return res.send(docs)
                    } 
                    return console.log(err)
                })
            } catch(e) {
                console.log(e)
                res.status(400).send('error, user not created');
            }

        })
    }
}

const userBuilder = new User;
userBuilder.RegisterUser(userModel, '/');
userBuilder.getItem(userModel, '/');

module.exports = router;
