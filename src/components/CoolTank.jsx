import React from "react";
import CoolTankCss from "./CoolTank.module.css";

export default function CoolTank(props) {
 


  //default props
  const {tankName="ChemicalTank", tankPercentage= "-1" } = props;

 
  //change this with apı value getter
  var percentage = 50;

  // if percentage is given as prop
 /* Checking if the prop is a number and if it is, it is setting the percentage to that number. */
  const perVal = parseInt(props.tankPercentage)
  percentage = perVal;
  //if(percentage < 5){props.parentCallback(true);}

  
  if(percentage > 100){percentage = 100;}if (percentage <0 ) { percentage=0;
    
  } else {
    
  }
  

  //change height by percantage
  var liquid = 250 * (percentage / 100);
  var empty = 250 - liquid;
  var valR;
  var valG;

  //change color by percantage
  if (percentage > 50) {
    valR = 248 - 248 * ((percentage - 50) / 50);
    valG = 255;
  } else {
    valR = 255;
    valG = 252 * (percentage / 50);
  }

  // in-line style implement
  var divStyleEmpty = { height: empty };
  var divStyleLiquid = {
    height: liquid,
    backgroundImage: `linear-gradient(to bottom left, rgb( ${valR}, ${valG},83) , rgb( ${valR}, ${valG},3) )`,
  };



  var isAlert= false;
  
  if (props.tankPercentage < 11 && props.tankPercentage>-1) {isAlert=true}
  else{isAlert=false}
  var name = props.tankName;
//  <p className={CoolTankCss.name}>{props.tankName}</p> 
console.log(isAlert);
  return (

    <div>  
    <div className={CoolTankCss.outline}>

<div className={isAlert == true ? CoolTankCss.iconsAlert : CoolTankCss.iconsNoAlert} >

<img className={CoolTankCss.icons} src={props.tankName}></img>
</div>


    <div className={CoolTankCss.container}>
      <div className={CoolTankCss.handle}>
        <div className={CoolTankCss.valve}></div>
        <div className={CoolTankCss.neck}></div>
      </div>
      <div className={CoolTankCss.body} >
        <div className={CoolTankCss.window}>
          <div className={CoolTankCss.bolt}></div>
          <div className={props.tankPercentage>=95 ? CoolTankCss.liquidFull: CoolTankCss.liquid} style={divStyleLiquid}></div>
          <div className={CoolTankCss.emptyliquid} style={divStyleEmpty}></div>
        </div>
      </div>
      <div className={CoolTankCss.bottom}></div>

      
    </div>
    </div>
    <div className={CoolTankCss.percent}> %{percentage} </div>
    </div>
  );
}
