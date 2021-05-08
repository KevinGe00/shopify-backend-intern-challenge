var mongoose = require('mongoose');

var ImageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    width: Number,
    height: Number,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('Image', ImageSchema);