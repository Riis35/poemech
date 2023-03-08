import DeviceCss from './Device.module.css';

import React from 'react';
import TankContainer from './TankContainer';

export default function Device(props){



    const alertme =()=>{alert("bas bas bas")}
   
   
        return(
            
            <div className={DeviceCss.container}>
                <button className={DeviceCss.name} onClick={alertme}> Cihaz Adı : {props.name}</button>
                <div className={DeviceCss.tankContainer}> <TankContainer isCollapsed="yes"   />  </div>
            </div>
        
        )
    
}