import React, { Component} from 'react';
import Headercontent from './Headercontent';
import UserContext from '../context/UserContext';
import Axios from 'axios';



class Supportbyme extends Component{
    static contextType = UserContext;

    constructor(props){
        super(props);
        
        this.logouts=this.logouts.bind(this);
        this.loginss=this.loginss.bind(this);
        this.unsupporter=this.unsupporter.bind(this)
        
        this.state={
            supports:0,
            reports:'',
            reportsconditions:'false',
            usernames:[],
            issue:'',
            subject:'',
            body:'',
            image:'',
            idss:'',
            myemailid:'',
            
        };
        
    }

    loginss=()=>{window.location="/user/login"}
    logouts=()=>{
    this.context.setUserData({
        token:undefined,
        user:undefined
    });
    localStorage.setItem("auth-token","");
   }

   unsupporter=async (idtoknow)=>{
   
       

    await Axios.get("http://localhost:5000/user/authandemailfinder",{headers:{"x-auth-token":localStorage.getItem("auth-token")}}).
    then(res=>{this.setState({myemailid:res.data});}).
    catch(err=>{console.log(err)});

    
    const objss2={
     emailid:this.state.myemailid,
     supportedtweetid:idtoknow,
    }
    await Axios.post("http://localhost:5000/user/unsupports",objss2).then(res=>{alert(res.data)}).catch(err=>{console.log(err)})
    }



   componentDidMount(){
    Axios.get("http://localhost:5000/user/retreivesupportedtweetbyme",{headers:{"x-auth-token":localStorage.getItem("auth-token")}})
    .then(res=>{console.log(res.data);this.setState({usernames:res.data});})
    .catch(err=>{console.log(err)})

    
    }
    render(){
        
        return( 
            <div>
                <Headercontent />
                {this.context.userData.user? 

                <div className="subbodyforfeed"> <button onClick={this.logouts} className="logoutdirector">logout</button>
                
                {this.state.usernames[0]!=1000?  this.state.usernames.map(tweeeter=> 
                 
                 <div className="feedarea" id="feedareaid"  key={tweeeter._id}>  
                 
                        <span className="subpartfeedarea" ><b>By username :</b>{tweeeter.emailid}</span>
                        <p className="subpartfeedarea"><b><i>Issue      </i>:</b> {tweeeter.issuetype}</p>
                        
                        <p className="subpartfeedarea"><b><i>Subject    </i>:</b> {tweeeter.subject}</p>
                        <span className="subpartfeedarea"><b><i>Body       </i>:</b>{tweeeter.body} </span>
                        <p className="subpartfeedarea"><b><i>Image:</i></b></p>
                        <img src={tweeeter.image} className="imgforfeed"/>
                        
                        <div className="likesdisplay">{tweeeter.supports} supporters</div>
                        <div className="likereportdiv">
                            <button className="btnforlikereport btnforlikereport2" onClick={()=>this.unsupporter(tweeeter._id)}>Undo support</button>
                            
                            <button className="btnforlikereport" onClick={this.reportdisplay}>Report</button>
                            <button className="btnforlikereport">share</button>
                        </div>
                  
                        
                 </div>) : <b className="notsupportedtext">you have not supported  anything yet</b>}
                    
                
            
                 </div> : <button onClick={this.loginss} className="logindirector">login</button> }
                
            </div>
        );
    }

}
export default Supportbyme;