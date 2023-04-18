const mongoose = require('mongoose');


const WithdrawSchema = new mongoose.Schema({
    userId : {type:String, required:true, trim:true},
    amount: {type:Number, required:true, trim:true},
    status: {type:Boolean, default:false},
    date: {type:Date, }
});

const Withdraw = new mongoose.model("withdraw", WithdrawSchema);

module.exports = Withdraw;