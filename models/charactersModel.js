require("dotenv").config();

const mongoose = require('mongoose');

const CharactersModel = mongoose.model(
    "characters",
    {
        level: {
            type: Number,
            required: true
        },
        life: {
            type: Number,
            required: true
        },
        job: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now()
        }
        // img: {
        //     data: Buffer,
        //     contentType: String
        // },
    },
)

module.exports = { CharactersModel };