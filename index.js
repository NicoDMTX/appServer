require("dotenv").config();
require('./models/dbConfig');

const bodyParser = require("body-parser");
const express = require('express')
const app = express();
const PORT = process.env.PORT;
const charactersRoutes = require('./routes/charactersController');
const monstersRoutes = require('./routes/monstersController');
const userRoutes = require('./routes/userController');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

app.use('/monsters', monstersRoutes)
app.use('/characters', charactersRoutes);
app.use('/user', userRoutes)

const initApp =  async () => {
    app.listen(5000, () => {
        console.log('Server launched at port : ' + PORT);
    });
}

initApp();


// const multer = require('multer');

// const { CharactersModel } = require('./models/charactersModel')

// const Storage = multer.diskStorage({
//     destination: 'images',
//     filename:(req, file, callback) => {
//         callback(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage:Storage
// }).single('testImage')

// app.post('/upload', (req, res) => {
//     upload(req,res, (err) => {
//         if(err) {
//             console.log(err);
//         } else {
//             const charactersModel = new CharactersModel({
//                 level: 1,
//                 life: 30,
//                 job: 'Barbare',
//                 image: {
//                     data: req.file.filename,
//                     contentType: 'image/png'
//                 }
//             })
//             charactersModel.save()
//         }
//     })
// })