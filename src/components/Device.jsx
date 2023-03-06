import DeviceCss from './Device.module.css';

import React from 'react';
import TankContainer from './TankContainer';

export default class Device extends React.Component{
    constructor(props){
        super(props);
}

    

    addTank(){
        alert('tank added')

    }

    render(){
        return(
            
            <div className={DeviceCss.container}>
                <h1 className={DeviceCss.name}> {this.props.name}</h1>
                <div className={DeviceCss.tankContainer}> <TankContainer isCollapsed="yes"   />  </div>
            </div>
        
        )
    }
}