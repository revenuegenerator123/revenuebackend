const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = '121$#$^$949uijckgio894Y*^**(o950890ujkgeroiut98u' ;
const USERDB = require('../models/userModel.js');













const authenticate = async (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        const tokenverify =  jwt.verify(token, secretkey );
        const rootuser = await USERDB.findOne({_id: tokenverify._id});
        if(!rootuser){ 
            res.status(401).json({status:401, msg:"token did not verified"})
        }

        req.token = token;
        req.rootuser = rootuser;
        req.photo = rootuser.photo;
        req.userId = rootuser._id;
        

        next();

    } catch (error) {
        res.status(401).json({status:401, msg:'Error while verifying the token'})
    }
}

module.exports = authenticate;