import React,{useState,useEffect} from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
  import { useNavigate } from "react-router-dom";

import CoolTank from "./CoolTank";
import TankContainerCss from "./TankContainer.module.css";

// Dynamically adds tanks inside Device

export default function TankContainer(props) {
  const {isCollapsed = "no",} = props

  const [isCollapse, setCollapse] = useState(isCollapsed === "no" ? false : true)

  const {id} = useParams();
   
  const getData = () => {
        
    
        

        
  }

   useEffect(() => {
    axios.post(`${process.env.REACT_APP_URL}/api/CabinInfo`,
        {id: id,
        }).then((response) => {
          if(!response.data.done){
          }
          else{
            const data = [["15 Faktör", `${response.data.f15}`, "154s8a"], ["30 Faktör", `${response.data.f30}`,"154qef1"],
            ["50 Faktör", `${response.data.f50}`,"1541231"], ["Nemlendirici", `${response.data.nemlendirici}`,"154kgiks1"],
            ["Bronzlaştırıcı", `${response.data.bronzlastirici}`,"154s51q"], ["Su", `${response.data.su}`,"154s7q5s"],
            ["Dezenfektan", `${response.data.dezenfektan}`,"154q87eq9s"],["Duş Köpüğü", `${response.data.duskopugu}`,"1jkviaq1"],
            ["Köpek Kremi", `${response.data.kopekkrem}`,"15i1841a"],["Köpek Şampuanı", `${response.data.kopeksampuan}`,"5618s8a"]];

            setTankProps(data);
          }
        })
      }, []);
    

    //list of tanks in device
  const [tankProps, setTankProps] = useState([]);

  const handleClick =({target}) =>{
    console.log('called' + target.id);
    setCollapse(()=> {if(isCollapse){return false} else{return true}});
    console.log(isCollapse);
  }

  return (
    <div  className={TankContainerCss.containerBody} >
     
     
      {collapsableTank(isCollapse, tankProps, handleClick)}
     
    </div>
  );
}



//collapsable tank list

const collapsableTank = (isCollapse, tankProps, handleClick) => {

  if(isCollapse){return( <button onClick={handleClick} id={Math.random()}> click to unfold </button> )}
  else{return( 
    
   
    tankProps.map((name, i) => (
    <div key={Math.random()} className={TankContainerCss.scroll} >
      {<CoolTank tankName={name[0]} tankPercentage={name[1]} key={name[2]}  /> }
    </div> )
  
    ) )}


}

// backup for tank adding code 
/*

{tankProps.map((name, i) => (
        <div key={name[2]*123} className={TankContainerCss.scroll} >
          {<CoolTank tankName={name[0]} tankPercentage={name[1]} key={name[2]}  /> }
        </div> 
      ))}

*/