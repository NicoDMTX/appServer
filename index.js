require("dotenv").config();
require('./models/dbConfig');

const express = require('express')
const app = express();
const PORT = process.env.PORT;

app.listen(5000, () => {
    console.log('Server launched at port : ' + PORT);
})