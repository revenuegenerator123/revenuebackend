const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretkey = '121$#$^$949uijckgio894Y*^**(o950890ujkgeroiut98u' ;



const userSchema = new mongoose.Schema({
  fname:{type:String, trim:true, required:true},
  lname:{type:String, trim:true, required:true},
  email:{type:String, trim:true, required:true},
  password:{type:String, trim:true, required:true},
  contact:{type:String, trim:true, required:true},
  address:{type:String, trim:true, required:true},
  cnic:{type:String, trim:true, required:true},
  city:{type:String, trim:true, required:true},
  zcode:{type:String, trim:true, required:true},
  refid:{type:String },
  photo:{type:String, required:true},
  status:{type:Boolean, default:false},
  date:{type:Date},
  checkAdmin: {type: Boolean, default:false},
  tokens:[
    {
        token:{
            type:String,
            required:true
        }
    }
  ]
});

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function(){
  try {
    let token23 = await jwt.sign({_id: this._id},secretkey, {expiresIn:'1d'});
    this.tokens = this.tokens.concat({token: token23});
    await this.save();
    return token23;
  } catch (error) {
    res.status(401).json({status:401,error});
  }
}

const USER = new mongoose.model('userData', userSchema);
module.exports = USER;