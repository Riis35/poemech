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

        <label className={LoginCss.inputLabel} > Kullanıcı Adı </label>
        <input type="text" id="username" value={userInput.username} onChange={handleTyping} />

        <label  className={LoginCss.inputLabel} > Şifre </label>
        <input type="text" id="password"  value={userInput.password}  onChange={handleTyping} />

        <button> Giriş Yap</button>
      </div>
    </div>
    
  );
}
