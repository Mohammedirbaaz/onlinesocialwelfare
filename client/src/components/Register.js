import React, { Component } from 'react';
import Headercontent from './Headercontent';
import Registerimage from './registerimage3.png';
import axios from 'axios';
class Register extends Component{
    constructor(props){
        super(props);
        this.changeholder=this.changeholder.bind(this);
        this.changeholder2=this.changeholder2.bind(this);
        this.changeholder3=this.changeholder3.bind(this);
        this.changeholder4=this.changeholder4.bind(this);
        this.changeholder5=this.changeholder5.bind(this);
        this.changeholder6=this.changeholder6.bind(this);
        this.verifypincode=this.verifypincode.bind(this);

        


        this.onSubmit=this.onSubmit.bind(this)
        this.state=({
            username:'',
            emailid:'',
            password:'',
            cpassword:'',
            aadharnumber:'',
            pincode:'',
            country:'',
            state:'',
            district:'',
            townorcity:[''],
            townorcity2:''
            
        });
    }

    changeholder=(e)=>{
        this.setState({
            username:e.target.value     
        })
    }

    changeholder2=(e)=>{
        this.setState({ 
            emailid:e.target.value
        })
    }
    changeholder3=(e)=>{
        this.setState({ 
            password:e.target.value
        })
    }
    changeholder4=(e)=>{
        this.setState({ 
            cpassword:e.target.value
        })
    }
    changeholder5=(e)=>{
        this.setState({ 
            aadharnumber:e.target.value
        })
        if(e.target.value.length>12){
            this.setState({
                aadharnumber:''
            }) 
    }

    }
    changeholder6=(e)=>{
        this.setState({ 
            pincode:e.target.value
        })
        if(e.target.value.length>6){
            this.setState({
                pincode:''
            })
        }
        
    }
   
    onSubmit(e){
        e.preventDefault();
        var clickeds=document.getElementById("clickedtown");
        var clickedfinal=clickeds.options[clickeds.selectedIndex].value
        console.log(clickedfinal)

        if(this.state.password===this.state.cpassword){

        

        const objs={
            username:this.state.username,
            emailid:this.state.emailid,
            password:this.state.password,
            cpassword:this.state.cpassword,
            aadharnumber:this.state.aadharnumber,
            pincode:this.state.pincode,
            country:this.state.country,
            state:this.state.state,
            district:this.state.district,
            townorcity2:clickedfinal   
        }
        console.log(this.state.townorcity)
        axios.post("http://localhost:5000/user/add",objs).
        then(res=>{console.log(res.data);window.location="/user/login"}).catch((err)=>{alert(`Something went wrong! Please try again`)});

        
       
    }else{
        alert("Your Password is not matching");
    }
    }
    verifypincode=()=>{
        axios.get("https://cors-anywhere.herokuapp.com/http://www.postalpincode.in/api/pincode/"+this.state.pincode)
        .then(response=>{
            
            console.log(response.data);
            let lengthoftown=response.data.Message;
            if(lengthoftown!=="No records found"){
                lengthoftown.toString();
            
                let countoflength=lengthoftown.charAt(32);
                let countoflength2=lengthoftown.charAt(33);
                let totalcountoflength=countoflength+countoflength2;
                console.log(totalcountoflength)
                let temparray=new Array(totalcountoflength+1);
                let countryu='';
                let stateu='';
                let districtu='';
    
                for(let i=0;i<totalcountoflength;i++){
                    temparray[0]="Select Town";
                    temparray[i+1]=[response.data.PostOffice[i].Name]
                    countryu=response.data.PostOffice[i].Country;
                    stateu=response.data.PostOffice[i].State;
                    districtu=response.data.PostOffice[i].District;

                }
                this.setState({  
                    townorcity:temparray,
                    country:countryu,
                    state:stateu,
                    district:districtu
                })   
            }else{
                this.setState({
                    pincode:''
                })
                alert(`Please Enter Valid Pincode!,your pincode ${this.state.pincode} is not valid`);
                
            }
            }).catch(err=>{
                console.log("error : "+err);
            })

    }
    componentDidMount(){
        
    
    }
    render(){
        return( 
       <div>
            <Headercontent />  
                <div className="containerlogin">
                <div className="containterloginlogintextpart">
                        <p className="containterloginlogintextpart2">Register</p>
                </div>
                    <img src={Registerimage} className={"containerimagehandler image2ndhandler"}/>
                    <form method="post" onSubmit={this.onSubmit}> 
                        <input type="text" name="useridname" className="containerlogininput" placeholder="Enter your name here" value={this.state.username} onChange={this.changeholder} />
                        <input type="email" name="emailidname" className="containerlogininput" placeholder="Your Email Id" value={this.state.emailid} onChange={this.changeholder2} />
                        <input type="password" name="passwordname" className="containerlogininput" placeholder="Password" value={this.state.password} onChange={this.changeholder3} />
                        <input type="password" name="cpasswordname" className="containerlogininput" placeholder="Confirm password" value={this.state.cpassword} onChange={this.changeholder4} />
                        <input type="number"  maxLength="12" name="aadharnumber" className="containerlogininput" placeholder="Aadhar Number(12 digits)" value={this.state.aadharnumber} onChange={this.changeholder5} />
                        <input type="number" name="pincode" className="containerlogininput pincodeinput" placeholder="Pincode(6 digits)" value={this.state.pincode} onChange={this.changeholder6} />
                        <a className="containerloginverify" onClick={this.verifypincode}>Verify</a>
                        <select className="containerlogininput towninput" id="clickedtown">{this.state.townorcity.map((towns,index)=><option key={index}>{towns}</option>)}</select>
                        <input type="submit" className="containerlogininput submit2" value="Register"/> 

                    </form>
                       
            </div>  
        
        </div>
        )
        
    }
}
export default Register;