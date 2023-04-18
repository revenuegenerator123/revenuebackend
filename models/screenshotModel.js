const mongoose = require('mongoose');


const screenshotSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    screenshot: {type:String, required: true},
    date: {type:Date, required:true}
});


const Screenshot = new mongoose.model('screenshot', screenshotSchema);

module.exports = Screenshot;