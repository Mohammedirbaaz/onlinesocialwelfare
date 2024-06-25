import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Tweet from './components/Tweet';
import Feed from './components/Feed';
import Aboutme from './components/Aboutme';
import Supportedbyme from './components/Supportbyme';
import SecondHome from './components/SecondHome';
import UserContext from './context/UserContext';
import axios from 'axios';


function App(){
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);




  return (
    <div className="App">
      <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Route path="/user/login" component={Login}/>
        <Route path="/user/Register" component={Register}/>
        <Route path="/user/Home" component={Home}/>
        <Route path="/user/SecondHome" component={SecondHome}/>
        <Route path="/user/Tweet" component={Tweet}/>
        <Route path="/user/Feed" component={Feed}/>
        <Route path="/user/aboutme" component={Aboutme}/>
        <Route path="/user/Supportedbyme" component={Supportedbyme}/>





        </UserContext.Provider>
      </Router>
    </div>
  );
  
}

export default App;
