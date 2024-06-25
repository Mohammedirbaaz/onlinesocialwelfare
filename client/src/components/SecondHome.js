import React, { Component,useState } from 'react';
import Headercontent from './Headercontent';
import loginimage from './loginimage.png'
import axios from 'axios';
import UserContext from '../context/UserContext';


class SecondHome extends Component{
    static contextType = UserContext;
    
    
        
   
        
   
    render(){
        const user2=this.context;
        
        
            return (
              
                
                   <div>dfdfdf{user2.userData.user}</div>
                
              
            )
          
    }
}
export default SecondHome;