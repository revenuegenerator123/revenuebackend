const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId : {type:String, required:true, trim:true},
    buyerName : {type:String, required:true, trim:true},
    product : {type:String, required:true, trim:true},
    quantity : {type:String, required:true, trim:true},
    contact : {type:String, required:true, trim:true},
    address : {type:String, required:true, trim:true},
    city : {type:String, required:true, trim:true},
    status : {type:Boolean, required:true, default:false },
    date: {type:Date, required:true}
});

const Order = new mongoose.model("order", OrderSchema);

module.exports = Order;