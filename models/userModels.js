const mongoose = require('mongoose');
const muv = require('mongoose-unique-validator')

const UserModel = mongoose.model(
    "user",
    {
        firstName: {
            type: String, 
            required: true,
            unique: true
        },
        password: {
            type: String, 
            required: true
        },
        date: { 
            type: Date, 
            default: Date.now 
        }
    }
)

mongoose.plugin(muv)

module.exports = { UserModel };