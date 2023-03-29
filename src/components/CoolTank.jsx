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

  var name = props.tankName;
//  <p className={CoolTankCss.name}>{props.tankName}</p> className={ props.tankPercentage == 0 ? CoolTankCss.grayscale : null }
  return (

    <div>  
    <div className={CoolTankCss.outline}>

<img className={CoolTankCss.icons} src={props.tankName}></img>



    <div className={CoolTankCss.container}>
      <div className={CoolTankCss.handle}>
        <div className={CoolTankCss.valve}></div>
        <div className={CoolTankCss.neck}></div>
      </div>
      <div className={CoolTankCss.body} >
        <div className={CoolTankCss.window}>
          <div className={CoolTankCss.bolt}></div>
          <div className={CoolTankCss.liquid} style={divStyleLiquid}></div>
          <div className={CoolTankCss.emptyliquid} style={divStyleEmpty}></div>
        </div>
      </div>
      <div className={CoolTankCss.bottom}></div>

      
    </div>
    </div>
    </div>
  );
}
