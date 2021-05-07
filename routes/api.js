const express = require ('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Load mongoose models
const imageModel = require('../models/image');


// Set up multer to store uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });


// Upload photos sent by users to mongodb database
router.post('/upload', upload.single('image'), (req, res) => {
    const image = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
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
