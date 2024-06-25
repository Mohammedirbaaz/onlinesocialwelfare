import React, { Component,useState } from 'react';
import Headercontent from './Headercontent';
import axios from 'axios';
import UserContext from '../context/UserContext';


class Aboutme extends Component{
    static contextType = UserContext;
    
    constructor(props){
        super(props);
        
        this.logouts=this.logouts.bind(this);
        this.loginss=this.loginss.bind(this);

        
        this.state={
            name:'',
            emailid:'',
            aadharno:'',
            state:'',
            district:'',
            townorcity:'',
            pincode:'',


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
   componentDidMount=async()=>{
    
        axios.get("http://localhost:5000/user/authandemailfinder",{headers:{"x-auth-token":localStorage.getItem("auth-token")}}).then((ress)=>{ 
            
        const objforemailid={
             emailid:ress.data,
        }
           axios.post("http://localhost:5000/user/getpersonaldetails",objforemailid).then((res)=>{
          
            
               this.setState({
                   name:res.data[0].username,
                   emailid:res.data[0].emailid,
                   aadharno:res.data[0].aadharno,
                   state:res.data[0].state,
                   district:res.data[0].district,
                   townorcity:res.data[0].townorcity,
                   pincode:res.data[0].pincode

               })
           }).catch((err)=>console.log(err))
       }).catch((err)=>console.log(err))
       
   
   }
   
   
    render(){
        
        
        return( 
            <div>
                <Headercontent />
                {
                this.context.userData.user ? <div>
                        <button onClick={this.logouts} className="logoutdirector">logout</button>
                            <table className="mydetails">
                                <tbody>
                                <tr>
                                    <td>Name:</td><td>{this.state.name}</td>
                                </tr>
                                <tr>
                                    <td>EmailId:</td><td>{this.state.emailid}</td>
                                </tr>
                                <tr>
                                    <td>Aadharno:</td><td>{this.state.aadharno}</td>
                                </tr>
                                <tr>
                                    <td>State:</td><td>{this.state.state}</td>
                                </tr>
                                <tr>
                                    <td>District:</td><td>{this.state.district}</td>
                                </tr>
                                <tr>
                                    <td>Town:</td><td>{this.state.townorcity}</td>
                                </tr>
                                <tr>
                                    <td>Pincode:</td><td>{this.state.pincode}</td>
                                </tr>

                                
                                </tbody>
                            </table>


                            <button className="buttonsforsupport"><a href="/user/supportedbyme" className="btnsubpart">Supported contents</a></button>

                        </div> : <button onClick={this.loginss} className="logindirector">login</button>
                           
                }
            </div>
                
        );
    }
}
export default Aboutme;