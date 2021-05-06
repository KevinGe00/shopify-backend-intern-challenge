const express = require ('express');
const multer = require('multer');
const router = express.Router();


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

router.get('/images', (req, res) => {

});

module.exports = router;
