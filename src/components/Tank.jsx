import React from "react";
import  TankCSS from './Tank.module.css';

export default class Tank extends React.Component{

     
    val = Math.random()*13;
    val2 = Number((this.val).toFixed(1));
    val3 = (this.val2 *10) + 10;


    memo= `${this.val3}px`;

    divstyle={
        height: this.memo,

    }


    render(){
        return(
            <div className={TankCSS.tank}>
                <div className={TankCSS.liquid}  style= {this.divstyle}> {this.val3} </div>
            </div>
        )
    }




}