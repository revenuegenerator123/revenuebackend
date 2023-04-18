const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    userId : {type:String, required: true},
    amount : {type:Number, required: true},
    date : {type: Date}
});
const InvoiceDb = new mongoose.model("invoice", invoiceSchema);
module.exports = InvoiceDb;