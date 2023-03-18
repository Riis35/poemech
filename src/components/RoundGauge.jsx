import React from 'react' 
import bronz from '../image/bronz.png'
import GaugeCss from './RoundGauge.module.css'

export default function RoundGauge() {
  return (
    <div className={GaugeCss.GaugeBody} >
         <img className={GaugeCss.imdiv} src={bronz} />

         <div  className={GaugeCss.box1}></div> 
         <div  className={GaugeCss.box2}></div> 
    
    
    </div>
  )
}
