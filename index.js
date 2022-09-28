const express = require('express')
const app = express();
const PORT = 5000

require('./models/dbConfig');

app.listen(5000, () => {
    console.log('Server launched at port : ' + PORT);
})