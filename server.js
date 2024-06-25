const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const connectDB = require("./Connection");
const cors=require("cors");
const session=require("express-session");
const  cookieParser=require("cookie-parser");

connectDB();
const IN_PROUD='production';

const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:"session123",
    saveUninitialized:true,
    resave:false,
    cookie:{
        httpOnly:true,
        maxAge:3600000,
        secure:true
    }
}));
app.use(express.static(__dirname+"public"));


const userrouter=require('./Routers/User');
app.use('/user',userrouter);

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("server started"));