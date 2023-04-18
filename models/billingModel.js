const mongoose = require('mongoose');


const billingSchema = new mongoose.Schema({
    userId : {type:String, required:true, trim:true},
    amount: {type:Number, required:true, trim:true},
    date: {type:Date, required:true}
});

const Billing = new mongoose.model("billing", billingSchema);

module.exports = Billing;