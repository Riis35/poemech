import DeviceCss from './Device.module.css';

import React, {useState} from 'react';
import TankContainer from './TankContainer';


export default function Device(props){
    const [collapse, setCollapse] = useState('yes');




    const handleCollapse =()=>{
        setCollapse((prev)=>  { const faruk = prev === "yes" ? "no":"yes"; return faruk} );
        console.log(collapse)
    }
   
   
        return(
            
            <div className={DeviceCss.container}>
                <button className={DeviceCss.name} onClick={handleCollapse}> Cihaz Adı : {props.name}</button>
                <div className={DeviceCss.tankContainer}> <TankContainer key={collapse} isCollapsed= {`${collapse}`}  />  </div>
                
            </div>
        
        )
    
}