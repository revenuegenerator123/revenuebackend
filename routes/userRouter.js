const express = require('express');
const userrouter = new express.Router();
const multer = require('multer');
const USERDB = require('../models/userModel.js');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const authenticate = require('../authentications/authenticate.js');



const imgconfig = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, './uploads');
    },
    filename:(req, file, callback)=>{
         callback(null, `image-${Date.now()}-${file.originalname}`)
    }
});

const isImg = (req, file, callback)=>{
if(file.mimetype.startsWith('image')){
    callback(null, true)
} else{
    throw new Error("Only images are allowed");
}

}


const Upload = multer({
    storage: imgconfig,
    fileFilter: isImg
})

// if (!fname || !lname || !email || !pass || !contact || !address || !cnic || !city || !zcode || !photo) {

userrouter.post('/register', Upload.single('photo'), async (req, res)=>{
const {fname, lname, email, pass, contact, address , cnic, city, zcode, refid} = req.body;
const {filename} = req.file;
if(!fname || !lname || !email || !pass || !contact || !address || !cnic || !city || !zcode  ){
    res.status(401).json({status:401, msg: "Must Fill all the Details "});
}
try {
    const preuser = await USERDB.findOne({email: email});
    if(preuser){
    res.status(401).json({status:401, msg: "User with the email already exists"});
    } else{
        const date = moment(new Date()).format('YYYY-MM-DD');
        const userdata = new USERDB({
            fname:fname,
            lname:lname,
            email:email,
            password: pass,
            contact:contact,
            address:address,
            cnic:cnic,
            city:city,
            zcode:zcode,
            photo:filename,
            date:date,
            refid: refid ,
        });
        const saveduser = await userdata.save();
        res.status(201).json({status:201, saveduser});
    }
} catch (error) {
    res.status(401).json({ status: 401, error });
          console.log('catch errror userRouter', error);  
}
});

userrouter.post('/login',async (req , res)=>{
   const {email, pass} = req.body;
   if(!email || !pass){
    res.status(401).json({ status: 401, msg:"Fill all login details" });
   }
   try {
    const iuser = await USERDB.findOne({email: email});
    if(iuser){
        const isMatch = await bcrypt.compare(pass , iuser.password);
        if(!isMatch){
            res.status(401).json({ status: 401, msg:"Fill all login details"});
        } else{
            const token = await iuser.generateAuthToken();
            const result ={
                iuser,
                token
            }
        res.status(201).json({status:201, result});
            
        }
    } else{
    res.status(401).json({ status: 401});

    }
   } catch (error) {
    res.status(401).json({ status: 401, error });
    
   }
});

userrouter.get('/valid', authenticate ,async(req, res)=>{
try {
    const fluser = await USERDB.findOne({_id: req.userId});
    const checkadmin = fluser.checkAdmin;
    res.status(201).json({status:201, fluser, checkadmin})
} catch (error) {
    res.status(401).json({ status: 401, error });
    
}
});

userrouter.get('/fetchsingle/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const fufuser = await USERDB.findOne({_id: id});
        res.status(201).json({status:201, fufuser});
        
    } catch (error) {
    res.status(401).json({ status: 401, error });
        
    }
});

userrouter.get('/getallreferences', authenticate, async(req, res)=>{
    try {
        const allreferences = await USERDB.find({refid: req.userId});
    res.status(201).json({ status: 201, allreferences });

    } catch (error) {
    res.status(401).json({ status: 401, error });
        
    }
});


userrouter.post('/updatestat/:id', async (req, res)=>{
    const {id} = req.params;
    const {status} = req.body;
    
    try {
        if(status == "true"){
         await USERDB.findByIdAndUpdate({_id: id},
            {
                status: true, 
            });
        res.status(201).json({status:201});
        } 
        else{
            await USERDB.findByIdAndUpdate({_id: id},
                {
                    status: false, 
                });
            res.status(201).json({status:201});
        }
    } catch (error) {
    res.status(401).json({ status: 401, error });
        
    }
});

userrouter.get("/logout", authenticate , async(req, res)=>{
    try {
       req.rootuser.tokens =  req.rootuser.tokens.filter((currentelem)=>{
        return currentelem.token !== req.token 
        
       });
       req.rootuser.save();
       res.status(201).json({status: 201});
    } catch (error) {
    res.status(401).json({ status: 401, error });
        
    }
});


userrouter.delete("/deleteaccount", authenticate, async (req, res)=>{
    try {
        await USERDB.deleteOne({_id : req.userId});
        res.status(201).json({status: 201});
    } catch (error) {
    res.status(401).json({ status: 401, error });
        
    }
})










module.exports = userrouter;