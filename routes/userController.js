require('dotenv').config();
const express = require('express');
const { userModel } = require('../models/userModels');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
    constructor(item, url) {
        this.item = item
        this.url = url
    }

    getItem = (item, url) =>  {
        router.get(url, this.authenticateToken, (req, res) => {
            const { email, password} = req.body
            item.find({ email: email, password: password }, (err, docs) => {

                if (!err) {
                    return res.json(email)
                }
                
                return console.log('Error to get data ' + err)
            })
            
        }) 
    }

    registerUser(item, url) {
        router.post(url, async (req, res) => {
            const { email, password } = req.body
            const salt = await bcrypt.genSalt(10)

            try {
                const newUser = await new item({ email, password: salt });

                await newUser.save((err, docs) => {
                    if(!err) {
                        console.log('Account created ! ');
                        return res.send(docs);
                    } 
                    return console.log(err);
                })
            } catch(e) {
                console.log(e);
                res.status(400).send('error, user not created');
            }
        })
    }

    loginUser(url) {
        router.post(url, async (req, res) => {
            const { email } = req.body
            
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken })
        })
    }

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) {
            return res.sendStatus(401)
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }

            req.user = user
            next()
        })
    }
}

const userBuilder = new User;
userBuilder.registerUser(userModel, '/register');;
userBuilder.getItem(userModel, '/');

module.exports = router;
