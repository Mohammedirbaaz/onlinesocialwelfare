const router=require("express").Router();
const express=require("express");
const mongoose=require("mongoose");
let User=require("../Models/User");
let Tweet=require("../Models/tweet");
let Supportedtweets=require("../Models/supportedtweets");
let Report=require("../Models/report");

var nodemailer = require('nodemailer');

let Image=require("../");

let useridlogin='';
const jwt=require("jsonwebtoken");
let auth=require("../Middleware/Auth");
const multer=require("multer");
const path=require("path");





var Storage = multer.diskStorage({
  destination: (req, res, cb)=> {
    cb(null,"./public/");
    
  },
  filename: (req, file, cb)=> {
    cb(null,"IMAGE_"+Date.now()+path.extname(file.originalname));
    
  },
  
})

var upload=multer({
  storage:Storage,
}).single('image');


router.route("/add").post(async (req,res)=>{
    
    const username=req.body.username;
    const emailid=req.body.emailid;
    const password=req.body.password;
    const confirmpassword=req.body.cpassword;
    const aadharno=Number(req.body.aadharnumber);
    const pincode=Number(req.body.pincode);
    const country=req.body.country;
    const state=req.body.state;
    const district=req.body.district;
    const townorcity=req.body.townorcity2;

    
    const emailExist=await User.findOne({emailid:req.body.emailid});

    if(emailExist){
        return res.status(400).send("Email already exists!");
        
    }else{
    const Usernewrecord=new User({username,emailid,password,confirmpassword,aadharno,pincode,country,state,district,townorcity});
    Usernewrecord
    .save()
    .then((userss)=>{res.json("successfully added")})
    .catch((err)=>res.json("error:"+err));
    }

})

router.route("/login").post((req,res)=>{
    
    const verifyuser= User.findOne({emailid:req.body.emailid,password:req.body.password})
    .then(userss=>{
        const token=jwt.sign({id:userss._id},"wG8@nZ9#pU9+nX2)eI6}aQ2&hY5@k");
        res.json({token,userss:{
            id:userss._id,
            username:userss.username,
            emailid:userss.emailid
        }});
    
    })
    .catch((err)=>{console.log("Email or password is wrong")})   
})
// router.delete("/delete",auth,async(req,res)=>{
//     try{
//     const deleteduser=await User.findByIdAndDelete(req.user);
//     res.json(deleteduser)
//     }catch(err){
//         res.status(500).json("error bro")
//     }
// })

router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token,"wG8@nZ9#pU9+nX2)eI6}aQ2&hY5@k");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json(
      id= user._id,
    );
  });

  router.get("/authandemailfinder",auth,async(req,res)=>{
    const user = await User.findById(req.user);
    await res.json( 
      emailid=user.emailid,
    );
    
  })
  

  router.post("/addtweet" ,upload,(req,res)=>{
    
     const emailid=req.body.emailid;
     const issuetype=req.body.issuetype;
     const subject=req.body.subject;
     const body=req.body.body;
     const image=req.file.path;
     const supports=0;
     const tweets=new Tweet({emailid,issuetype,subject,body,image,supports});
     tweets.save().then(res.json("successfully added")).catch(err=>{console.log("error"+err)})
     
  })

  router.get("/retreivetweet",auth,async(req,res)=>{
    if(req.user){ 
      
     const userpincodefinder=await User.findById(req.user);
     const userareapincode=userpincodefinder.pincode;

     const tweeteremailidfinder=await Tweet.find();
     
     var tweeteremailid=[1000];
     var tweeterid=[1000];
     var tweethandler=[1000];
     var tweeterpincode=[1000];
     var tweeterpincodefinder=[1000];
     for(let i=0;i<tweeteremailidfinder.length;i++){ 
      tweeteremailid[i]=tweeteremailidfinder[i].emailid;
      tweeterid[i]=tweeteremailidfinder[i]._id;

      tweeterpincodefinder[i]=await User.find({'emailid':tweeteremailid[i]});
      tweeterpincode[i]=tweeterpincodefinder[i][0].pincode;
      

        if(userareapincode===tweeterpincode[i]){
          tweethandler[i]=await Tweet.findById(tweeterid[i]);
        }else{
          tweethandler[i]=0;
        }
    }
      
      var conditions=true;
      // for(let j=0;j<=tweethandler.length;j++){
      //   if(tweethandler[j]===0){
      //     for(let k=j+1;k<=tweethandler.length;k++){
      //       if(tweethandler[k]!==0){
      //         tweethandler[j]=tweethandler[k];
      //         tweethandler[k]=0;
      //         if(!tweethandler[k+1]){
      //           tweethandler.length=k;
                
      //         }          
      //       }
      //     } 
          
         
   
      //   }        
      // }
    

      

       
     

      res.json(tweethandler)
        
    }
  })


  

  router.post("/supports",async(req,res)=>{

    const emailid=req.body.emailid;
    const supportedtweetid=req.body.supportedtweetid;

    const supportfinder=await Supportedtweets.findOne({emailid:emailid,supportedtweetid
      :supportedtweetid});

    
    if(supportfinder){
      res.json("Sorry! you already voted")
    }
    else{
      
    

    const result3=await new Supportedtweets({emailid,supportedtweetid})
    result3.save().catch(err=>{console.log(err)});
    const increasevote=await Tweet.findById(supportedtweetid);
    var increasefinal=increasevote.supports;
    
    increasefinal=increasefinal+1;
    var finalupdate=supportedtweetid;


    const noofvotefinder = await Tweet.findById(supportedtweetid);
    const noofvote=noofvotefinder.supports;
     
    const userareapincodefinder =await User.findOne({emailid:emailid});
    const userareapincode=userareapincodefinder.pincode;
 
    const noofpeoplefinder=await User.find({pincode:userareapincode});
    const noofpeople=noofpeoplefinder.length;
 
    const calculator1=increasefinal/noofpeople;
    const calculator2=calculator1*100;
    console.log(noofvote,noofpeople,calculator1,calculator2)
 
    console.log(calculator2)
 
    if(calculator2>=75){
       console.log("this tweet has reached 75%");
 
       var tweetsubject=noofvotefinder.subject;
       var tweetbody=noofvotefinder.body;
       var emailidoftweeter=noofvotefinder.emailid;
 
       var tweeterdetails=await User.findOne({emailid:emailidoftweeter});
 
 
       var stateofuser =tweeterdetails.state;
       var districtofuser =tweeterdetails.district;
       var townorcityofuser =tweeterdetails.townorcity;
       
 
 
       tweetsubject="From Online Social Welfare of "+ townorcityofuser+" town ,By "+emailidoftweeter+" : "+tweetsubject;
       tweetbody="State : "+stateofuser+",\n"+"District : "+districtofuser+",\n"+"Town : "+townorcityofuser+",\n"+"'"+tweetbody+"'"+"\n"+"people of "+townorcityofuser+" supported this tweet by "+emailidoftweeter+" ,the vote percentage is : "+calculator2 +"%, and the mail sent news is sent to that user,please take action on that matter" ;
 
       var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'irbaaz000@gmail.com',
         pass: 'irb@@z000!I'
       }
        });
     
     var mailOptions = {
       from: 'irbaaz000@gmail.com',
       to: 'sujithroshan2000@gmail.com',
       subject: tweetsubject,
       text: tweetbody
     };
     //gjagadeesh@vit.ac.in
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });
    }
     Tweet.findOneAndUpdate({_id:finalupdate},{'supports':increasefinal}).then(res.json("thanks for voting")).catch(res.json("Something went wrong!"))
  }

    
    
    

    
    



  })


  router.post("/unsupports",async(req,res)=>{

    const emailid=req.body.emailid;
    const supportedtweetid=req.body.supportedtweetid;

    const usernameofuser=await User.find({emailid:emailid})

    const supportfinder=await Supportedtweets.findOne({emailid:emailid,supportedtweetid:supportedtweetid});

    if(supportfinder){ 
      const gettweettoreduce=await Tweet.findById(supportedtweetid);
      var decreasesupports=gettweettoreduce.supports;
      if(decreasesupports>=1){ 
      decreasesupports=decreasesupports-1;
      }else{
        decreasesupports=0;
      }
      
      var finaldecreaseupdate=decreasesupports;
      var finaldecreasesupport=await Tweet.findOneAndUpdate({_id:gettweettoreduce._id},{'supports':finaldecreaseupdate}).then().catch(err=>{console.log("from decreasing supports "+err)})
          remover=await Supportedtweets.deleteOne(supportfinder)
          .then(res.json("Your Support removed ! , "+usernameofuser[0].username+" !"))
          .catch(err=>{console.log("from removing document "+err)})
    
    }
  })

  router.get("/retreivesupportedtweetbyme",auth,async(req,res)=>{

    const user = await User.findById(req.user);
    
    const emailid=user.emailid;
    

    const finalresult=await Supportedtweets.find({emailid:emailid})
    

    var resultidsupport=[1000];
    var searchtweet=[1000]
    for(let i=0;i<finalresult.length;i++){
     resultidsupport[i]=finalresult[i].supportedtweetid;
    
     searchtweet[i]=await Tweet.findById(resultidsupport[i])
    
    }
    res.json(searchtweet)
  })


  router.post("/reports",async(req,res)=>{

    const reporttweet=req.body.reporttweet;
    const reportselect=req.body.reportselect;
    const reporttext=req.body.reporttext;
    const users=req.body.users;

    console.log(reporttweet,reportselect,reporttext,users)
    

    var savereport= new Report({reporttweet,reportselect,reporttext,users})
    savereport.save().then(res.json("successfully saved your report!")).catch(err=>res.json(err))
  });

  router.post("/getpersonaldetails",async(req,res)=>{
    
    const emailid=req.body.emailid;
    
    const details=await User.find({'emailid':emailid})
    
    res.json(details)

  })


module.exports=router;