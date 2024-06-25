const mongoose=require("mongoose");

const URI="mongodb+srv://egovadmin:egovadmin@cluster0.w0qkr.mongodb.net/dbegov?retryWrites=true&w=majority";

const connectDB=async()=>{
    await mongoose.connect(URI,{useUnifiedTopology:true,useNewUrlParser:true})
    console.log("you lazy ass!! Database established")
}
module.exports=connectDB;