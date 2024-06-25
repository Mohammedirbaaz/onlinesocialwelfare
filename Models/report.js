const mongoose=require("mongoose");
const schema=mongoose.Schema

const userschema3=new schema({
    
    reporttweet:{
        type:String,
        required:true
    },
    reportselect:{
        type:String,
        required:true
    },
    reporttext:{
        type:String,
        required:true
    },
    users:{
        type:String,
        required:true
    },
},
    { 
    timestamps:true
    }
);

const userd2=mongoose.model("report",userschema3);
module.exports=userd2;

