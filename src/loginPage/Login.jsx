import React, {useState} from "react";
import LoginCss from "./Login.module.css";

export default function Login() {

 const [userInput, setInput] = useState({username: '',password:''})


const handleTyping = ({target}) =>{
  if(target.id === "username"){setInput(()=> target.value)}
  if (target.id === "password"){setInput(()=> target.value)}
  console.log(target.id + " is " + target.value)
}

  return (
   <div className={LoginCss.page}>

      <div className={LoginCss.containerbox}>

        <h1> POEMECH </h1>

        <div className={LoginCss.labelArea}>
        <label className={LoginCss.inputLabel} > Kullanıcı Adı </label>
        </div>

        <div className={LoginCss.inputArea}>
        <input className={LoginCss.inputSpace} type="text" id="username" value={userInput.username} onChange={handleTyping} />
        </div>
        <div className={LoginCss.labelArea} >
        <label  className={LoginCss.inputLabel} > Şifre </label>
        </div>

        <div className={LoginCss.inputArea}>
        <input className={LoginCss.inputSpace} type="text" id="password"  value={userInput.password}  onChange={handleTyping} />
        </div>

        <div className={LoginCss.buttonArea} >
        <button className={LoginCss.logButton}> Giriş Yap</button>
        </div>
        
      </div>
    </div>
    
  );
}
