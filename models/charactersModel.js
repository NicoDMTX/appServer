require("dotenv").config();

const mongoose = require('mongoose');
const dbName = process.env.dbName;

const CharactersModel = mongoose.model(
    dbName,
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
    },
    "characters"
)

export default CharactersModel;