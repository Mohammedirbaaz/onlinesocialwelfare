const mongoose=require("mongoose");
const schema=mongoose.Schema

const userschema2=new schema({
    
    emailid:{
        type:String,
        required:true
    },
    issuetype:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    supports:{
        type:Number,
        required:true
    }
},
    { 
    timestamps:true
    }
);

const userd2=mongoose.model("Tweets",userschema2);
module.exports=userd2;

