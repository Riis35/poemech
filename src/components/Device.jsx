import DeviceCss from './Device.module.css';

import React from 'react';
import TankContainer from './TankContainer';

export default class Device extends React.Component{
    constructor(props){
        super(props);
}

    
    alerting(){
        alert('tank added')
    }

    render(){
        return(
            
            <div className={DeviceCss.container}>
                <button className={DeviceCss.name} onClick={this.alerting}> Cihaz Adı : {this.props.name}</button>
                <div className={DeviceCss.tankContainer}> <TankContainer isCollapsed="yes"   />  </div>
            </div>
        
        )
    }
}