import React from 'react';
import axios from 'axios';
import './Login2.scss';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



class FluidInput extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        focused: false,
        value: ""
      };
    }
    
    focusField() {
      const { focused } = this.state;
      this.setState({
        focused: !focused
      });
    }
    handleChange(event) {
      const { target } = event;
      const { value } = target;
      this.setState({
        value: value
      });
    }
    render() {
      const { type, label, style, id } = this.props;
      const { focused, value } = this.state;
      
      let inputClass = "fluid-input";
      if (focused) {
        inputClass += " fluid-input--focus";
      } else if (value !== "") {
        inputClass += " fluid-input--open";
      }
      
      return (
        <div className={inputClass} style={style}>
          <div className="fluid-input-holder">
            
            <input 
              className="fluid-input-input"
              type={type}
              id={id}
              value={value}
              onFocus={this.focusField.bind(this)}
              onBlur={this.focusField.bind(this)}
              onChange={this.handleChange.bind(this)}
              autoComplete="off"
            />
            <label className="fluid-input-label" forhtml={id}>{label}</label>
            
          </div>
        </div>
      );
    }
  }
  
  class Button extends React.Component {
    render() {
      return (
        <div className={`button ${this.props.buttonClass}`} onClick={this.props.onClick}>
          {this.props.buttonText}
        </div>
      );
    }
  }
  

  
  function LoginContainer() {

    const[id, setId] = useState();

    const [loginstatus, setLoginStatus] = useState("");
  
    const navigate = useNavigate();

    const login = () =>{
        const user = document.getElementById("kullanici");
        const pass = document.getElementById("sifre");


        axios.post(`${process.env.REACT_APP_URL}/api/login`,
        {username: user.value,
        password: pass.value,
        }).then((response) => {
          if(!response.data.auth){
            setLoginStatus("Başarısız");
          }
          else{
            localStorage.setItem("token", response.data.token)
            navigate(`/main/${response.data.id}`);
          }
        })
      };


      const style = {
        margin: "15px 0"
      };
      const AuthPls = () =>{
        axios.get(`${process.env.REACT_APP_URL}/api/isAuth`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response) => {
          setauthenticated(response.data.auth);
          if(response.data.auth){
            setId(response.data.id);
          }
        })
      }
      const [authenticated, setauthenticated] = useState(null);
      useEffect(() => {
        AuthPls();
      }, []);
    
      if(authenticated){
        navigate(`/main/${id}`);
      }
      else{
        return (
          <div className="login-container">
            <div className="title">
             POEMECH
            </div>
            <FluidInput type="text" label="Kullanıcı Adı" id="kullanici" style={style}/>
            <FluidInput type="password" label="Şifre" id="sifre" style={style}/>
            <h3>{loginstatus} </h3>
            <Button buttonText="Giriş" buttonClass="login-button" onClick={login}/>
          </div>
          
        );
      }
      
    }
  
  

  export default LoginContainer;