const authenticate = require('../authentications/authenticate.js');
const moment = require('moment');
const express = require('express');
const awardrouter = new express.Router();
const multer = require('multer');
const AwardDB = require("../models/awardsModel.js");



const imgconfig = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, "./uploads");
    },
    filename: (req, file, callback)=>{
        callback(null, `image-${Date.now()}-${file.originalname}`);
    }
});
const isImg = (req, file, callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null, true);
    } else{
        throw new Error("Only images are allowed");
    }
};

const Upload = multer({
    storage: imgconfig,
    fileFilter: isImg,
});

awardrouter.post("/addaward", Upload.single("photo") , async(req , res)=>{
const {title, desc} = req.body;
const {filename} = req.file;
    try {
        const date = moment(Date.now()).format("L");
        const AddAward = new AwardDB({
            photo: filename,
            title: title,
            desc : desc ,
            date : date 
        });
        const awardadded = await AddAward.save();
        res.status(201).json({status:201, awardadded});

    } catch (error) {
        res.status(401).json({status:401, error});
    }
});

awardrouter.get("/getallawards", async(req, res)=>{
    try {
        const allawards = await AwardDB.find({}).sort({_id: -1});
        res.status(201).json({status:201, allawards});

    } catch (error) {
        res.status(401).json({status:401, error});
        
    }
});




module.exports = awardrouter;