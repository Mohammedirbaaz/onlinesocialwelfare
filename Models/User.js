const mongoose=require("mongoose");
const schema=mongoose.Schema

const userschema=new schema({
    username:{
        type:String,
        required:true,
        minlength:3,
    },
    emailid:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    confirmpassword:{
        type:String,
        required:true,
        minlength:6
    },
    aadharno:{
        type:Number,
        required:true,
        minlength:12
    },
    pincode:{
        type:Number,
        required:true,
        minlength:6
    },
    country:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    townorcity : {
        type:String,
        required:true,
    }
},{ 
    timestamps:true
});

const userd=mongoose.model("userdetailegov",userschema);
module.exports=userd;

