const mongoose=require("mongoose");
const schema=mongoose.Schema

const userschema3=new schema({
    
    emailid:{
        type:String,
        required:true
    },
    supportedtweetid:{
        type:String,
        required:true
    },
},
    { 
    timestamps:true
    }
);

const userd3=mongoose.model("Supportedtweets",userschema3);
module.exports=userd3;

