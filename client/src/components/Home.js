import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom'
import Headercontent from './Headercontent';
import loginimage from './loginimage.png'
import axios from 'axios';
import UserContext from '../context/UserContext';

function Home(){
    const {userData,setUserData}=useContext(UserContext);

    const history=useHistory();
    const loginss=()=>{history.push("/user/login");}
    const logouts=()=>{
        setUserData({
            token:undefined,
            user:undefined
        });
        localStorage.setItem("auth-token","");
    };
    

     console.log(userData.user)
    
    
    

   return( 
       
    <div>
      <div className="popupforlogout"></div>
        <Headercontent />
        
        {
        userData.user ? <div>
<button onClick={logouts} className="logoutdirector">logout</button>
                      <div className="cardview">
                          <div className="item1"><img className="item1child" src="https://img.icons8.com/fluent/96/000000/ball-point-pen.png"/></div>
                          <div className="item2"><a className="item2child" href="/user/Tweet">Tweet</a></div>
                          
                        </div>
                        <div className="cardview">
                          <div className="item1"><img className="item1child" src="https://img.icons8.com/color/96/000000/activity-feed-2.png"/></div>
                          <div className="item2"><a className="item2child" href="/user/Feed">Feed</a></div>

                        </div>
                        <div className="cardview">
                          <div className="item1"><img className="item1child" src="https://img.icons8.com/fluent/96/000000/gender-neutral-user.png"/></div>
                          <div className="item2"><a className="item2child" href="/user/aboutme">Me</a></div>

                        </div>

            </div> : <button onClick={loginss} className="logindirector">login</button>
        
        }
        
        
    </div>
    )
    
}
export default Home;