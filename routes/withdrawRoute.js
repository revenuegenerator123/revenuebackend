const authenticate = require('../authentications/authenticate.js');
const moment = require('moment');
const express = require('express');
const withdrawrouter = new express.Router();
const WithdrawDB = require('../models/withdrawModel.js');


withdrawrouter.post("/requestwithdraw", authenticate, async (req, res)=>{
    const {withdrawrequest, userearning} = req.body;
    try {
        const date = moment(Date.now()).format("L");
           if(userearning > 1500){
             const requestwd = new WithdrawDB({
            userId: req.userId,
            amount: withdrawrequest,
            date: date
        });
        const savedrequest = await requestwd.save();
        res.status(201).json({status:201, savedrequest});
           }
       
    } catch (error) {
    res.status(401).json({status:401, error});
        
    }
});
// this is for user 
withdrawrouter.get("/withdrawhistory", authenticate, async(req, res)=>{
    try {
        const fetchedwithdrawhis = await WithdrawDB.find({userId: req.userId}).sort({_id: -1});
        res.status(201).json({status:201, fetchedwithdrawhis});
    } catch (error) {
    res.status(401).json({status:401, error});
        
    }
});
// this is for admin 
withdrawrouter.get("/getallwithhist", async(req, res)=>{
    try {
        const fetchalldata = await WithdrawDB.find({status: false}).sort({_id: -1});
        res.status(201).json({status:201, fetchalldata});
    } catch (error) {
    res.status(401).json({status:401, error});
        
    }
});
withdrawrouter.post("/updatestatus/:id", async(req, res)=>{
    const {id} = req.params;
    const {userid} = req.body;
    try {
         await WithdrawDB.findByIdAndUpdate({_id:id},
            {
                status: true
            });

        res.status(201).json({status:201});
            
    } catch (error) {
    res.status(401).json({status:401, error});
        
    }
});


// REMEBER!
// When you will pay him you will update status to completed

module.exports = withdrawrouter ;