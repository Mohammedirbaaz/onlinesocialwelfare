import React, { Component,useState } from 'react';
import Headercontent from './Headercontent';
import loginimage from './loginimage.png'
import UserContext from '../context/UserContext';
import Axios from 'axios';



class Feed extends Component{
    static contextType = UserContext;

    constructor(props){
        super(props);
        
        this.logouts=this.logouts.bind(this);
        this.loginss=this.loginss.bind(this);
        this.supporter=this.supporter.bind(this);
        this.cancel=this.cancel.bind(this);
        this.reportdisplay=this.reportdisplay.bind(this);
        this.changehandler1=this.changehandler1.bind(this);
        this.changehandler2=this.changehandler2.bind(this);
        this.reports=this.reports.bind(this);

        

        this.state={
            supports:0,
            reports:'',
            reportsconditions:'false',
            username:'',
            issue:'',
            subject:'',
            body:'',
            image:'',
            idss:'',
            myemailid:'',
            conditionsforloading:false,
            reportselect:'',
            reporttext:'',
            reporttweet:''
        };
        
    }
    changehandler1=(e)=>{
        this.setState({
            reportselect:e.target.value
        })
    }
    changehandler2=(e)=>{
        this.setState({
            reporttext:e.target.value
        })
    }

    loginss=()=>{window.location="/user/login"}
    logouts=()=>{
    this.context.setUserData({
        token:undefined,
        user:undefined
    });
    localStorage.setItem("auth-token","");
   }
   supporter=async (idtoknow)=>{
   
       

       await Axios.get("http://localhost:5000/user/authandemailfinder",{headers:{"x-auth-token":localStorage.getItem("auth-token")}}).
       then(res=>{this.setState({myemailid:res.data});}).
       catch(err=>{console.log(err)});

       
       const objss2={
        emailid:this.state.myemailid,
        supportedtweetid:idtoknow,
    }
    await Axios.post("http://localhost:5000/user/supports",objss2).then(res=>{alert(res.data)}).catch(err=>{console.log(err)})
    }

    
    
   
   cancel=()=>{
    document.getElementById("popupsforreportid").style.display="none";
   }
   reportdisplay=(idtoreport)=>{
    document.getElementById("popupsforreportid").style.display="block";
    this.setState({
        reporttweet:idtoreport
    })

    
    }
    reports=()=>{
        var clickeds=document.getElementById("clickedissue");
        this.state.reportselect=clickeds.options[clickeds.selectedIndex].value.toString()
        
        Axios.get("http://localhost:5000/user/authandemailfinder",{headers: {
            "x-auth-token": localStorage.getItem("auth-token")
          }}).then((res)=>{ 
              console.log(res)
              this.setState({
                users:res.data
              })
            const objforreport={
                reporttweet:this.state.reporttweet,
                reportselect:this.state.reportselect,
                reporttext:this.state.reporttext,
                users:this.state.users,
            }
            console.log(this.state.reporttweet,this.state.reportselect,this.state.reporttext,this.state.users)
            Axios.post("http://localhost:5000/user/reports",objforreport).then((res)=>{console.log(res.data)})
            })
    
    }


     componentDidMount(){
        Axios.get("http://localhost:5000/user/retreivetweet",{headers:{"x-auth-token":localStorage.getItem("auth-token")}})
        .then(res=>{
         this.setState({
         username:res.data,
         conditionsforloading:true
            });
      
            console.log(res.data);})
        .catch(err=>{console.log(err)})
        }
    
 
     render(){
        
        
        
       
        function issuefinder(ints){
            switch (ints){
                case "bribe demand":
                    return "bribe demand";
                case "abuse":
                    return "abuse";
            }
        }

        window.addEventListener("beforeunload", function (e) {
           
            return "You sure?";                            
          });
        
        return( 
            
            <div>
                <Headercontent />
                <div className="popupsforreport" id="popupsforreportid">
                    <div>
                        
                        <select className="typesofcategory" id="clickedissue">
                        <option className="typesofcategory" onChange={this.changehandler1}>Select option</option>
                        <option>false statement</option>
                        <option>illegal activity</option>
                        <option>Violence</option>
                        <option>Spam</option></select>
                        <textarea className="typesofcategory textareapart" onChange={this.changehandler2}></textarea>
                        <button  className="btnsforreport btncancel" onClick={this.reports}>report</button>
                        
                    </div>
                        <button  className="btnsforreport "  onClick={this.cancel}>Cancel</button>

                </div>
                {(this.context.userData.user && this.state.conditionsforloading)? <div className="subbodyforfeed"><button onClick={this.logouts} className="logoutdirector">logout</button>
                
                
                


               
               
               
                { this.state.username.map(tweeeter=> 
                 
                 <div className="feedarea" id="feedareaid"  key={tweeeter._id}>  
                 
                        <span className="subpartfeedarea" ><b>By userid :</b>{tweeeter.emailid}</span>
                        <p className="subpartfeedarea"><b><i>Issue      </i>:</b> {tweeeter.issuetype}</p>
                        
                        <p className="subpartfeedarea"><b><i>Subject    </i>:</b> {tweeeter.subject}</p>
                        <span className="subpartfeedarea"><b><i>Body       </i>:</b>{tweeeter.body} </span>
                        <p className="subpartfeedarea"><b><i>Image:</i></b></p>
                        <img src={tweeeter.image} className="imgforfeed"/>
                        
                        <div className="likesdisplay">{tweeeter.supports} supporters</div>
                        <div className="likereportdiv">
                            <button className="btnforlikereport btnforlikereport2" onClick={()=>this.supporter(tweeeter._id)}>support</button>
                            
                            <button className="btnforlikereport" onClick={()=>this.reportdisplay(tweeeter._id)}>Report</button>
                            <button className="btnforlikereport">share</button>
                        </div>
                  
                        
                 </div>)}
                
            
                 
             </div> : <button onClick={this.loginss} className="logindirector">login</button> }
                
            </div>
        );
    }
}
export default Feed;