const mongoose = require('mongoose');
const { isEmail } = require('validator')

const UserModel = mongoose.model(
    "user",
    {
        firstName: {
            type: String, 
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email']
        },
        password: {
            type: String, 
            required: [true, 'Please enter a password'],
            minlength: [6, 'Minimum password is length 6 characters'],
        },
        date: { 
            type: Date, 
            default: Date.now 
        }
    }
)

module.exports = { UserModel };