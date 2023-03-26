import DeviceCss from "./Device.module.css";

import React, { useState } from "react";
import TankContainer from "./TankContainer";

export default function Device(props) {
  const [collapse, setCollapse] = useState("yes");

  // arrow Rotating code

  // collapsed
  const collapsedArrow = { transform: `rotate(-45deg)` };
  // unfold
  const unfoldArrow = { transform: `rotate(45deg)` };

  const [arrow, setArrow] = useState(collapsedArrow);

  const handleCollapse = () => {
    setArrow((prev) => {
      return prev.transform === "rotate(-45deg)" ? unfoldArrow : collapsedArrow;
    });

    setCollapse((prev) => {
      const faruk = prev === "yes" ? "no" : "yes";
      return faruk;
    });
  };


  const colorPalette = ["#e8dff5", "#fce1e4", "#cf4dd", "#ddedea", "#daeaf6"];



  // eğer yüzde 5 altında ise alarm verme yeri bura isUnderFivePercent true ise alrm veriyo false ise takmıyo
  
  let  isUnderFivePercent = false ;
  let bgStyle = {};
   if(isUnderFivePercent) { bgStyle =  { backgroundColor : "red"};}
   else { bgStyle = { backgroundColor: colorPalette[parseInt(props.color)]}}

   // alarm yeri biddi
  
  return (
    <div className={DeviceCss.container}  style={bgStyle}>
      <div className={DeviceCss.buttonAndArrow}>
        <div className={DeviceCss.arrow} style={arrow} key={collapse}></div>
        <button className={DeviceCss.name} onClick={handleCollapse}>
          {" "}
          Cihaz Adı : {props.name}
        </button>
      </div>
      <div className={DeviceCss.tankContainer}>
        {" "}
        <TankContainer
          key={collapse}
          isCollapsed={`${collapse}`}
          index={props.index}
        />{" "}
      </div>
    </div>
  );
}
