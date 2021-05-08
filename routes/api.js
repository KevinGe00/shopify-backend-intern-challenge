const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Load mongoose models
const imageModel = require('../models/image');


// Set up multer to store uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/images/'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });


//
router.get('/all', (req, res) => {
    imageModel.find({}, (err, images) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            console.log(images);
            res.status(200).send(images);
        }
    });
});

// Upload photos sent by users to mongodb database
router.post('/upload', upload.single('img'), (req, res) => {

    const image = {
        name: req.body.name,
        desc: req.body.desc,
        width: req.body.width,
        height: req.body.height,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    // Save to DB using schema for images
    imageModel.create(image, (err, item) => {
        if (err) {
            console.log(err)
            res.status(500).send("Internal server error");
        } else {
            // Created model success and saved to db
            res.status(201).send()
        }
    })
});

module.exports = router;
