import React,{useState,useEffect} from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams}
    from 'react-router-dom';
  import { useNavigate } from "react-router-dom";

import CoolTank from "./CoolTank";
import TankContainerCss from "./TankContainer.module.css";
import spf15 from "../image/spf15.png";
import spf30 from "../image/spf30.png";
import spf50 from "../image/spf50.png";
import moist from "../image/moist.png";
import bronz from "../image/bronz.png";
import su from "../image/shower.png";
import dezenfektan from "../image/change.png";
import duskopugu from "../image/spf15.png";
import kopekkrem from "../image/spf15.png";
import kopeksampuan from "../image/spf15.png";

// Dynamically adds tanks inside Device

export default function TankContainer(props) {
  const {isCollapsed = "no",} = props

  const [isCollapse, setCollapse] = useState(isCollapsed === "no" ? false : true)

  const {id} = useParams();
  const role = localStorage.getItem("top")

   useEffect(() => {
    if(role === "0"){
      axios.post(`${process.env.REACT_APP_URL}/api/CabinAdminInfo`,
        {id: id,
        }).then((response) => {
          if(!response.data.done){
          }
          else{
            const data = [[spf15, `${response.data.result[props.index].f15}`, "154s8a"], [spf30, `${response.data.result[props.index].f30}`,"154qef1"],
            [spf50, `${response.data.result[props.index].f50}`,"1541231"], [moist, `${response.data.result[props.index].nemlendirici}`,"154kgiks1"],
            [bronz, `${response.data.result[props.index].bronzlastirici}`,"154s51q"], [su, `${response.data.result[props.index].su}`,"154s7q5s"],
            [dezenfektan, `${response.data.result[props.index].dezenfektan}`,"154q87eq9s"],[duskopugu, `${response.data.result[props.index].duskopugu}`,"1jkviaq1"],
            [kopekkrem, `${response.data.result[props.index].kopekkrem}`,"15i1841a"],[kopeksampuan, `${response.data.result[props.index].kopeksampuan}`,"5618s8a"]];
            setTankProps(data);
          }
        })
    }
    else{
      axios.post(`${process.env.REACT_APP_URL}/api/CabinInfo`,
        {id: id,
        }).then((response) => {
          if(!response.data.done){
          }
          else{
            const data = [[spf15, `${response.data.result[props.index].f15}`, "154s8a"], [spf30, `${response.data.result[props.index].f30}`,"154qef1"],
            [spf50, `${response.data.result[props.index].f50}`,"1541231"], [moist, `${response.data.result[props.index].nemlendirici}`,"154kgiks1"],
            [bronz, `${response.data.result[props.index].bronzlastirici}`,"154s51q"], [su, `${response.data.result[props.index].su}`,"154s7q5s"],
            [dezenfektan, `${response.data.result[props.index].dezenfektan}`,"154q87eq9s"],[duskopugu, `${response.data.result[props.index].duskopugu}`,"1jkviaq1"],
            [kopekkrem, `${response.data.result[props.index].kopekkrem}`,"15i1841a"],[kopeksampuan, `${response.data.result[props.index].kopeksampuan}`,"5618s8a"]];
            setTankProps(data);
          }
        })
    }
    
      }, []);
    

    //list of tanks in device
  const [tankProps, setTankProps] = useState([]);

  const handleClick =({target}) =>{
    setCollapse(()=> {if(isCollapse){return false} else{return true}});
  }

  return (
    <div  className={TankContainerCss.containerBody} >
     
     
      {collapsableTank(isCollapse, tankProps, handleClick)}
     
    </div>
  );
}



//collapsable tank list

const collapsableTank = (isCollapse, tankProps, handleClick) => {

  if(isCollapse){return(
     //<button onClick={handleClick} id={Math.random()}> click to unfold </button> 
     <div className={TankContainerCss.touch}> Detayları Görmek İçin Cihaz Adına Tıklayın</div>
     )}
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