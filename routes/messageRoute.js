const moment = require('moment');
const express = require('express');
const messagerouter = new express.Router();
const messageDB = require("../models/messageModel.js");
const authenticate = require('../authentications/authenticate.js');


messagerouter.post("/sendmessage", async(req, res)=>{
    const {email, name, message} = req.body;
    try {
        const date = moment(Date.now()).format("L");
        const usermessage = new messageDB({
            email: email,
            name: name,
            message: message,
            date: date
        });
        const savedmessage = await usermessage.save();
        res.status(201).json({status:201, savedmessage});
    } catch (error) {
        res.status(401).json({status:401, error});
    }
});

messagerouter.get("/getallmessage", authenticate , async(req, res)=>{
    try {
        const gottenmessages = await messageDB.find({}).sort({_id: -1});
        res.status(201).json({status:201, gottenmessages});
    } catch (error) {
        res.status(401).json({status:401, error});
        
    }
} );

messagerouter.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params;
    try {
        await messageDB.deleteOne({_id: id});
        res.status(201).json({status:201});
    } catch (error) {
        res.status(401).json({status:401, error});
        
    }
})




module.exports = messagerouter;