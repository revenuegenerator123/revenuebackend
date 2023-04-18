const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    photo: {type:String, required:true},
    desc : {type:String, required: true},
    title : {type:String, required: true},
    date: {type:Date, required:true},

});

const AwardDB = new mongoose.model("award", awardSchema);
module.exports = AwardDB;