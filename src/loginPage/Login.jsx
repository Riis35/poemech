import React, {useState,useEffect } from "react";
import LoginCss from "./Login.module.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {

 const [Username, setUsername] = useState("");
 const [Password, setPassword] = useState("");
 const [alpha, setAlpha] = useState('');


const handleTyping = ({target}) =>{
  if(target.id === "username"){setUsername(()=> target.value)}
  if (target.id === "password"){setPassword(()=> target.value)}
}

const[id, setId] = useState();

    const [loginstatus, setLoginStatus] = useState("");
  
    const navigate = useNavigate();

     const error = {color : "rgba (255,0,0," +alpha + ")" };

     const raiseError =()=>{
      setAlpha((prev) =>(prev=0)); // bu big brain satır prev in değerinin 1 0 arası değişmesini sağlar, eğer prev 0 ise prev=0 ifaedesi 1 döner eğer prev 1 ise prev=0 hata olduğundan 0 döner
     }

    const loginfunc = () =>{

        axios.post(`${process.env.REACT_APP_URL}/api/login`,
        {username: Username,
        password: Password,
        }).then((response) => {
          if(!response.data.auth){
           setAlpha('Hatalı Giriş')
          }
          else{
            localStorage.setItem("token", response.data.token)
            navigate(`/main/${response.data.id}`);
          }
        })
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
          <div className={LoginCss.page}>
       
             <div className={LoginCss.containerbox}>
       
               <h1 className={LoginCss.banner}> POEMECH </h1>
       
               <div className={LoginCss.labelArea}>
               <label className={LoginCss.inputLabel}  id="usernamelabel"> Kullanıcı Adı </label>
               </div>
       
               <div className={LoginCss.inputArea}>
               <input className={LoginCss.inputSpace} type="text" id="username" value={Username} onChange={handleTyping} />
               </div>
               <div className={LoginCss.labelArea} >
               <label  className={LoginCss.inputLabel} id="passwordlabel" > Şifre </label>
               </div>
       
               <div className={LoginCss.inputArea}>
               <input className={LoginCss.inputSpace} type="text" id="password"  value={Password}  onChange={handleTyping} />
               </div>

              <div className={LoginCss.error} >  {alpha}</div>

               <div className={LoginCss.buttonArea} >
               <button className={LoginCss.logButton} onClick={loginfunc}> Giriş Yap</button>
               </div>
             </div>
           </div>
           
         );
      }
  
}
