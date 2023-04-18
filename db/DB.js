const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://ranasaimalisabirali:SaiM123@mlm.l2k21je.mongodb.net/mlmdatabase?retryWrites=true&w=majority";

mongoose.connect(DB_URL,{useUnifiedTopology:true, useNewUrlParser:true})
.then(()=> console.log("Database Connected successfully"))
.catch((err)=>console.log('Error Connection to Database failed',err))
