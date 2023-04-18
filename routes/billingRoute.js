const authenticate = require('../authentications/authenticate.js');
const moment = require('moment');
const express = require('express');
const billingrouter = new express.Router();
const BillingDB = require('../models/billingModel.js');

billingrouter.post('/addpayment/:id', async(req, res)=>{
const {amount} =  req.body;
const {id} = req.params;
try {
    const date = moment(Date.now()).format("L");
    const payment = new BillingDB({
        userId: id,
        amount: amount,
        date: date,
    });
    const paymentAdded = await payment.save();
    res.status(201).json({status:201, paymentAdded});
} catch (error) {
    res.status(401).json({status:401, error});
}
});

billingrouter.get("/getallhistory", authenticate ,async(req, res)=>{
try {
    const transactionhistory = await BillingDB.find({userId: req.userId});
    res.status(201).json({status:201, transactionhistory});
} catch (error) {
    res.status(401).json({status:401, error});
    
}
});


module.exports = billingrouter;