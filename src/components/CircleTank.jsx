import React from "react";
import CircleTankCss from "./CircleTank.module.css";

export default function CircleTank(props) {
 


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



  var isAlert= false;
  
  if (props.tankPercentage < 11 && props.tankPercentage>-1) {isAlert=true}
  else{isAlert=false}
  var name = props.tankName;
//  <p className={CircleTankCss.name}>{props.tankName}</p> 
  
  return (

    <div class="container">
    <div class="gauge">
      <h1 class="coolHeader"> %10 </h1>
       <div class="gauge_body"> 
      
        <div class="gauge_fill">  </div>
        <div class="gauge_cover" >
          
            image here S  </div>

      </div>
       
    </div>
    <img class="icon" src="coldwater.png"  />

    </div>
  );
}
