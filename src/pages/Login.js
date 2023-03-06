import React from 'react';
import Axios from 'axios'
import axios from 'axios';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate}
    from 'react-router-dom';
import Main from './Main';

import { useNavigate } from "react-router-dom";


function Login() {
  const [UsernameReg, setUsernameReg] = useState("");
  const [PasswordReg, setPasswordReg] = useState("");
  const [MailReg, setMailReg] = useState("");

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const [loginstatus, setLoginStatus] = useState("");

  const navigate = useNavigate();

  const register = () =>{
    axios.post(`${process.env.REACT_APP_URL}/api/register`,
    {username: UsernameReg,
    password: PasswordReg,
    mail: MailReg}).then((response) => {
      console.log(response.data)
    })
    .catch(function (error) {
      console.error(error);
    });
  };

  const login = () =>{
    axios.post(`${process.env.REACT_APP_URL}/api/login`,
    {username: Username,
    password: Password,
    }).then((response) => {
      if(!response.data.auth){
        setLoginStatus("Başarısız");
      }
      else{
        localStorage.setItem("token", response.data.token)
        navigate("/main");
      }
    })
  };

  const AuthPls = () =>{
    Axios.get(`${process.env.REACT_APP_URL}/api/isAuth`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
      setauthenticated(response.data.auth);
    })
  }
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    AuthPls();
  }, []);

  if(authenticated){
    navigate("/main");
  }
  else{
    return (
      <div className='app'>
        <div className='registration'>
          <h1>Registration</h1>
          <label>Username</label>
          <input type='text' onChange={(e) =>
          {setUsernameReg(e.target.value);
          }
          }></input>
          <label>Password</label>
          <input type='text' onChange={(e) =>
          {setPasswordReg(e.target.value);
          }
          }></input>
          <label>Mail</label>
          <input type='text' onChange={(e) =>
          {setMailReg(e.target.value);
          }
          }></input>
          <button onClick={register}>Register</button>
        </div>
        <div className='login'>
          <h1>Login</h1>
          <input type='text' placeholder = "Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type='text' placeholder = "Password" onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={login}>Login</button>
        </div>
        <div>
          <h1>{loginstatus} </h1>
        </div>
      </div>
      
    );
  }
  
}
export default Login;
