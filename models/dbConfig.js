const mongoose = require('mongoose');
const DbUrl = "mongodb://localhost:27017/fightGame"

mongoose.connect(DbUrl, (error) => {
    if (!error) {
        return console.log("Connected to db")
    }
    
    return console.log("Connection error : " + error)
    }
);