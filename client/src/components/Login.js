import React, { Component,useState } from 'react';
import Headercontent from './Headercontent';
import loginimage from './loginimage.png'
import axios from 'axios';
import UserContext from '../context/UserContext';


class Login extends Component{
    static contextType = UserContext;
    
    constructor(props){
        super(props);
        this.changeholder=this.changeholder.bind(this);
        this.changeholder2=this.changeholder2.bind(this);
        this.onSubmit=this.onSubmit.bind(this)
        this.state={
            emailid:'',
            password:''
        };
    }

    changeholder=(e)=>{
        this.setState({
            emailid:e.target.value     
        })
    }

    changeholder2=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    
    onSubmit(e){
        const user1=this.context;
        e.preventDefault();
        const objs2={
            emailid:this.state.emailid,
            password:this.state.password
        }
        axios.post("http://localhost:5000/user/login",objs2).
        then(res=>{
            user1.setUserData({
                token:res.data.token,
                user:res.data.userss
            });
            localStorage.setItem("auth-token",res.data.token)
            console.log(res.data.userss.username);
            window.location="/user/Home"
            

        })
        .catch(err=>{
            console.log("error: "+err);
        })

        
    }
    render(){
        
        return( 
       <div>
          
           
            {this.context.userData.user ? window.location="/user/Home" : <div>
            <Headercontent />     
             <div className="containerlogin">
                    <div className="containterloginlogintextpart">
                        <p className="containterloginlogintextpart2">Login</p>
                    </div>
                    <img src={loginimage} className={"containerimagehandler"}/>
                    <form method="post">
                        <input type="email" name="useridname" className="containerlogininput" value={this.state.emailid} onChange={this.changeholder} />
                        <input type="password" name="passwordname" className="containerlogininput" value={this.state.password} onChange={this.changeholder2} />
                        <input type="submit" className="containerlogininput submit2" onClick={this.onSubmit}/>
                    </form>
             </div>
             <a href="/user/Register" className="registerlink">New User?Register Account? Click here</a>
             </div>}
        </div>
        )
    }
}
export default Login;