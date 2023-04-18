const authenticate = require('../authentications/authenticate.js');
const moment = require('moment');
const express = require('express');
const orderrouter = new express.Router();
const ORDERDB = require("../models/orderModel.js");


orderrouter.post("/add", authenticate , async (req, res)=>{

    const {product, quantity, contact, address, city, buyerName} = req.body;
try {
    const date = moment(Date.now()).format("L");
    const sendOrder = new ORDERDB({
        userId: req.userId,
        product: product,
        quantity: quantity, 
        contact: contact,
        address: address,
        city: city,
        buyerName: buyerName,
        date: date
    });
    const ordersent = await sendOrder.save();
    res.status(201).json({status:201, ordersent});
    
} catch (error) {
    res.status(401).json({status:401, error});
}
});

orderrouter.get("/myorders", authenticate, async(req, res)=>{
    try {
        const gotyourorders = await ORDERDB.find({userId: req.userId});
    res.status(201).json({status:201, gotyourorders});
        
    } catch (error) {
    res.status(401).json({status:401, error});
        
    }
});

orderrouter.get("/updatestatus/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        await ORDERDB.findByIdAndUpdate({_id: id}, {
            status: true ,
        });
    res.status(201).json({status:201});

    } catch (error) {
    res.status(401).json({status:401, error});
        
    }
});

orderrouter.get("/allorders", async(req, res )=>{
    try {
       const gotyourorders = await ORDERDB.find({}).sort({_id: -1});
    res.status(201).json({status:201, gotyourorders});

    } catch (error) {
    res.status(401).json({status:401, error});
        
    }
})


module.exports = orderrouter;
