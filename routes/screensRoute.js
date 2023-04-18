const authenticate = require('../authentications/authenticate.js');
const moment = require('moment');
const express = require('express');
const screenrouter = new express.Router();
const multer = require('multer');
const ScreenDB = require('../models/screenshotModel.js')





const imgConfig = multer.diskStorage({
    destination: (req,file, callback)=>{
        callback(null, './uploads');
    },
    filename: (req, file, callback)=>{
        callback(null,  `image-${Date.now()}-${file.originalname}`);
    }
});
const isImg = (req, file, callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null, true)
    } else{
        res.status(401).json({status:401, msg:"Only Images are allowed"});

    }
}


const upload = multer({
    storage: imgConfig,
    fileFilter: isImg
})

screenrouter.post('/upload', authenticate, upload.single('photo'),async(req, res)=>{
    const {filename} = req.file;
    if(!filename){
        res.status(401).json({status:401, msg:"Must Upload Image"});
    }
    try {
        const date = moment(new Date()).format('YYYY-MM-DD');
        const screenshot = new ScreenDB({
            screenshot: filename,
            userId: req.userId,
            date: date
        });
        const savedscreenshot = await screenshot.save();
        res.status(201).json({status:201, savedscreenshot});


    } catch (error) {
        res.status(401).json({status:401, error});
        
    }
});

screenrouter.get('/getall', authenticate, async (req, res)=>{
    try {
        const ftdscreens = await ScreenDB.find({}).sort({_id: -1});
        res.status(201).json({status:201, ftdscreens});
        
    } catch (error) {
        res.status(401).json({status:401, error});
        
    }
})














module.exports = screenrouter;
