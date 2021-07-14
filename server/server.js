require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const connectDB= require('./config/mongoose')
const PORT = process.env.PORT || 8000;

connectDB();
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))

//steps 3: Heroku deployment
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path = require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(PORT, () =>{ console.log('Server is running on port', PORT) });


//MONGO_URI = mongodb://localhost:27017/Quick-Ship
