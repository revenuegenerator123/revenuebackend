const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const userrouter = require('./routes/userRouter.js');
const screenrouter = require('./routes/screensRoute.js');
const billingrouter = require('./routes/billingRoute.js');
const withdrawrouter = require('./routes/withdrawRoute.js');
const invoicerouter = require('./routes/invoiceRoute.js');
const awardrouter = require("./routes/awardRoute.js");
const messagerouter = require("./routes/messageRoute.js");
const orderrouter = require("./routes/orderRoute.js");


app.use(cors());
app.use(express.json());
require('./db/DB.js');
app.use('/user', userrouter);
app.use('/invoice', invoicerouter);
app.use('/award', awardrouter);
app.use('/screenshot', screenrouter);
app.use('/withdraw', withdrawrouter);
app.use('/billing', billingrouter);
app.use('/message', messagerouter);
app.use('/orders', orderrouter);
app.use('/uploads', express.static('./uploads'));


const port = 8000 ;

app.listen(port, ()=>{
    console.log('Server is running on port:', + port);
});