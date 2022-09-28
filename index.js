require("dotenv").config();
require('./models/dbConfig');

const bodyParser = require("body-parser");
const express = require('express')
const app = express();
const PORT = process.env.PORT;
const charactersRoutes = require('./routes/charactersController');

app.use(bodyParser.json());
app.use('/characters', charactersRoutes);

app.listen(5000, () => {
    console.log('Server launched at port : ' + PORT);
})