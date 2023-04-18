const authenticate = require('../authentications/authenticate.js');
const express = require('express');
const invoicerouter = new express.Router();
const InvoiceDb = require('../models/invoiceModel.js');
const moment = require("moment");


invoicerouter.post("/addinvoice", async(req, res)=>{
    const {amount , userId} = req.body;
    const date = moment(Date.now()).format("L");
    try {
         const invoice = new InvoiceDb({
            userId: userId,
            amount: amount,
            date : date
         });
         const savedinvoice = await invoice.save();
        res.status(201).json({status:201, savedinvoice});
        
    } catch (error) {
        res.status(401).json({status:401, error});
    }
});

invoicerouter.get("/getallinvoices", authenticate, async(req, res )=>{
    try {
        const gotteninvoices = await InvoiceDb.find({userId: req.userId}).sort({_id: -1});
        res.status(201).json({status:201, gotteninvoices});
    } catch (error) {
        res.status(401).json({status:401, error});
        
    }
});

invoicerouter.get("/getsingleinvoice/:id", async (req, res )=>{
    const {id} = req.params;
    try {
        const singleinvoice = await InvoiceDb.find({_id: id});
        res.status(201).json({status:201, singleinvoice});
    } catch (error) {
        res.status(401).json({status:401, error});
        
    }
})


module.exports = invoicerouter ;






