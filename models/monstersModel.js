require("dotenv").config();

const mongoose = require('mongoose');

const MonstersModel = mongoose.model(
    'monsters',
    {
        name: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        life: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now()
        }
    }
)

module.exports = { MonstersModel };