import React, { Component,useState } from 'react';
import Headercontent from './Headercontent';
import axios from 'axios';
import UserContext from '../context/UserContext';


class Tweet extends Component{
    static contextType = UserContext;
    
    constructor(props){
        super(props);
        
        this.logouts=this.logouts.bind(this);
        this.loginss=this.loginss.bind(this);
        this.fileSelectorHandler=this.fileSelectorHandler.bind(this);
        this.submithandler=this.submithandler.bind(this);   
        this.changehandler1=this.changehandler1.bind(this);
        this.changehandler2=this.changehandler2.bind(this);
        this.changehandler3=this.changehandler3.bind(this);
        




        this.state={
            issuetype:'',
            subject:'',
            body:'',
            image:''
        }
    }
    
    loginss=()=>{window.location="/user/login"}
    logouts=()=>{
    this.context.setUserData({
        token:undefined,
        user:undefined
    });
    localStorage.setItem("auth-token","");
   }
   fileSelectorHandler=(e)=>{
       this.setState({
           image:e.target.files[0]
       })
   }

   changehandler1=(e)=>{
        this.setState({
            issuetype:e.target.value
        })
   }
   changehandler2=(e)=>{
    this.setState({
        subject:e.target.value
        })
    }
    changehandler3=(e)=>{
        this.setState({
            body:e.target.value
        })
   }
   
  


   submithandler=async (e)=>{
    e.preventDefault()
    console.log(this.state.image);

    var temp=localStorage.getItem("auth-token");
    
    var clickeds=document.getElementById("clickedissue");
    this.state.issuetype=clickeds.options[clickeds.selectedIndex].value.toString()

    axios.get("http://localhost:5000/user/authandemailfinder",{headers: {
        "x-auth-token": temp
      },})
    .then(res=>{
       
    let data=new FormData();
    data.append('emailid',res.data);
    data.append('issuetype',this.state.issuetype);
    data.append('subject',this.state.subject);
    data.append('body',this.state.body);
    data.append('image', this.state.image);
        
         console.log(data.get('emailid')+""+data.get('issuetype')+""+data.get('subject')+""+data.get('body')+""+data.get('image'));;
    
        axios.post("http://localhost:5000/user/addtweet",data).
        then(res=>{alert(res.data);}).
        catch(err=>{console.log("error from adding tweets"+err)})
    })
    .catch(err=>{console.log("error from identifying authentication"+err);})
   
   }
 
    render(){
        
        return( 
            <div>
                <Headercontent />
                {this.context.userData.user? <div><button onClick={this.logouts} className="logoutdirector">logout</button>
                
                <div className="sidenote">
                        Dear User,Whatever your issues is ,that 
                        will be openly viewable to the user who is 
                        living on your town.Your tweet won't be directly send to the higher officals or lower officals until it crosses 75% of support or like.
                        The Government is with you ! 
                </div>
                
            
                <form className="tweetareafirst" encType="multipart/form-data">
                    <select type="text" className="inputss" onChange={this.changehandler1} id="clickedissue">
                    <option>Select option</option>
                        <option>bribe demand</option>
                        <option>abuse</option>
                        <option>Misbehave</option>
                        <option>Threat</option>
                        <option>Other</option>

                    </select>
                    <input type="text" className="inputss" placeholder="Subject" onChange={this.changehandler2}/>
                    <textarea className="inputss inputss2" placeholder="Enter your issues" onChange={this.changehandler3} />
                    <input type="file" className="inputss inputssfile" onChange={this.fileSelectorHandler} name="file"/>
                    <input type="submit" className="inputss inputss3" value="Tweet" onClick={this.submithandler}/>

                    
                </form>
               

                
                
                </div> : <button onClick={this.loginss} className="logindirector">login</button> }
                
            </div>
        );
    }
}
export default Tweet;