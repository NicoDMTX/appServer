require("dotenv").config();
require('./models/dbConfig');

const bodyParser = require("body-parser");
const express = require('express')
const app = express();
const PORT = process.env.PORT;
const charactersRoutes = require('./routes/charactersController');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use('/characters', charactersRoutes);

app.listen(5000, () => {
    console.log('Server launched at port : ' + PORT);
})