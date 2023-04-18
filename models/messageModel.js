const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    email : {type:String, required: true},
    name : {type:String , required: true},
    message: {type:String , required: true},
    date : {type: Date}
});
const MessageDb = new mongoose.model("message", messageSchema);
module.exports = MessageDb;